
import SocketService from 'services/SocketService';
import History from 'utils/History';

import ShareRootConstants from 'constants/ShareRootConstants';
import IconConstants from 'constants/IconConstants';

import * as API from 'types/api';
import * as UI from 'types/ui';


const handleCreate: UI.ActionHandler<void> = ({ location }) => {
  History.push(`${location.pathname}/directories`);
};

const handleEdit: UI.ActionHandler<API.ShareRootEntry> = (
  { data: root, location }
) => {
  History.push(`${location.pathname}/directories/${root.id}`);
};

const handleRemove: UI.ActionHandler<API.ShareRootEntry> = (
  { data: root }
) => {
  return SocketService.delete(ShareRootConstants.ROOTS_URL + '/' + root.id);
};



const ShareRootCreateActions: UI.ActionListType<undefined> = {
  create: { 
    displayName: 'Add directory',
    access: API.AccessEnum.SETTINGS_EDIT, 
    icon: IconConstants.CREATE,
    handler: handleCreate,
  },
};

const ShareRootEditActions: UI.ActionListType<API.ShareRootEntry> = {
  edit: { 
    displayName: 'Edit directory',
    access: API.AccessEnum.SETTINGS_EDIT, 
    icon: IconConstants.EDIT,
    handler: handleEdit,
  },
  remove: { 
    displayName: 'Remove directory',
    access: API.AccessEnum.SETTINGS_EDIT,
    icon: IconConstants.REMOVE,
    confirmation: {
      // eslint-disable-next-line max-len
      content: 'Are you sure that you want to remove the directory {{item.virtual_name}} from share? It will be removed from all share profiles.',
      approveCaption: 'Remove directory',
      rejectCaption: `Don't remove`,
    },
    handler: handleRemove,
  },
};

export default {
  create: {
    moduleId: UI.Modules.SHARE,
    subId: 'root',
    actions: ShareRootCreateActions,
  },
  edit: {
    moduleId: UI.Modules.SHARE,
    subId: 'root',
    actions: ShareRootEditActions,
  }
};
