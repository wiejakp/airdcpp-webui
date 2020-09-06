'use strict';

import React, { useEffect } from 'react';
import cx from 'classnames';

import * as API from 'types/api';
import * as UI from 'types/ui';

import { formatSize } from 'utils/ValueFormat';
import { TFunction } from 'i18next';
import { createFileBundle } from 'services/api/QueueApi';
import { dupeToStringType } from 'utils/TypeConvert';
import { parseMagnetLink } from 'utils/MagnetUtils';
import { TableDownloadMenu } from 'components/menu';


const magnetDownloadHandler: UI.DownloadHandler<UI.DownloadableItemInfo> = (itemInfo, user, downloadData) => {
  return createFileBundle({
    ...itemInfo,
    ...downloadData,
    user,
  });
};


export interface MagnetHighlightProps {
  text: string;
  contentType: API.FileContentType;
  dupe: API.Dupe | null;
  user: UI.DownloadSource | undefined; 
  addDownload: UI.AddItemDownload;
  t: TFunction;
}

export const MagnetHighlight: React.FC<MagnetHighlightProps> = ({
  text, dupe, user, contentType, addDownload, t
}) => {
  const magnet = parseMagnetLink(text);
  if (!magnet) {
    return (
      <>
        { text }
      </>
    );
  }

  const { name, size } = magnet;

  let caption = name;
  if (!!size) {
    caption += ` (${formatSize(size, t)})`;
  }

  const downloadUser = !!user && 
    user.flags.indexOf('bot') === -1 && 
    user.flags.indexOf('hidden') === -1 ? user : undefined;

  let downloadId = magnet.tth;
  if (downloadUser) {
    downloadId += `:${downloadUser.cid}`;
  }

  const downloadData: UI.DownloadableItemInfo = {
    id: downloadId,
    ...magnet,
    type: {
      id: 'file',
      str: '',
      content_type: contentType,
    },
    dupe,
    tth: magnet.tth,
    path: undefined,
    time: undefined,
  };

  useEffect(
    () => {    
      addDownload(downloadId, {
        downloadHandler: magnetDownloadHandler,
        itemDataGetter: () => Promise.resolve(downloadData),
        userGetter: () => downloadUser,
        session: undefined,
      });
    },
    []
  );

  // Use table dropdown to avoid issues with overflow and dupe coloring
  return (
    <TableDownloadMenu
      className={ cx('highlight magnet', dupeToStringType(dupe)) }
      caption={ caption }
      user={ downloadUser }
      itemInfoGetter={ () => downloadData }
      downloadHandler={ magnetDownloadHandler }
      triggerIcon={ null }
      session={ undefined }
    />
  );
};
