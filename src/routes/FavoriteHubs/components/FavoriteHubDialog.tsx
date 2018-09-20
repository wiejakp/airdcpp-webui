import React from 'react';
import Modal from 'components/semantic/Modal';

import ModalRouteDecorator, { ModalRouteDecoratorChildProps } from 'decorators/ModalRouteDecorator';
import OverlayConstants from 'constants/OverlayConstants';

import ShareProfileConstants from 'constants/ShareProfileConstants';
import FavoriteHubConstants from 'constants/FavoriteHubConstants';

import SocketService from 'services/SocketService';

import ShareProfileDecorator, { ShareProfileDecoratorChildProps } from 'decorators/ShareProfileDecorator';
import IconConstants from 'constants/IconConstants';

import t from 'utils/tcomb-form';

import Form, { FormFieldChangeHandler, FormFieldSettingHandler, FormSaveHandler } from 'components/form/Form';
import { normalizeEnumValue, intTransformer } from 'utils/FormUtils';
import { RouteComponentProps } from 'react-router';
import DataProviderDecorator, { DataProviderDecoratorChildProps } from 'decorators/DataProviderDecorator';

import * as API from 'types/api';
import * as UI from 'types/ui';


const Fields: UI.FormFieldDefinition[] = [
  {
    key: 'name',
    type: API.SettingTypeEnum.STRING,
  }, {
    key: 'hub_url',
    type: API.SettingTypeEnum.STRING,
  }, {
    key: 'hub_description',
    type: API.SettingTypeEnum.STRING,
    optional: true,
  }, {
    key: 'share_profile',
    type: API.SettingTypeEnum.NUMBER,
    optional: true,
  }, {
    key: 'auto_connect',
    type: API.SettingTypeEnum.BOOLEAN,
  }, {
    key: 'nick',
    type: API.SettingTypeEnum.STRING,
    optional: true,
  }, {
    key: 'user_description',
    type: API.SettingTypeEnum.STRING,
    optional: true,
  }
];

const isAdcHub = (hubUrl?: string) => !!hubUrl && (hubUrl.indexOf('adc://') === 0 || hubUrl.indexOf('adcs://') === 0);

// Get selection values for the profiles field
const getFieldProfiles = (profiles: API.SettingEnumOption[], url?: string) => {
  return profiles
    .filter(p => isAdcHub(url) || p.id === ShareProfileConstants.HIDDEN_PROFILE_ID)
    .map(normalizeEnumValue);
};

interface FavoriteHubDialogProps {

}

interface DataProps extends DataProviderDecoratorChildProps {
  hubEntry?: API.FavoriteHubEntry;
}

//interface Entry extends API.FavoriteHubEntryBase, UI.FormValueMap {
  //share_profile: number | null;
//}


interface Entry extends API.FavoriteHubEntryBase, UI.FormValueMap {

}

type Props = DataProps & ShareProfileDecoratorChildProps & 
  ModalRouteDecoratorChildProps & RouteComponentProps<{ entryId: string; }>;

class FavoriteHubDialog extends React.Component<Props> {
  static displayName = 'FavoriteHubDialog';

  isNew = () => {
    return !this.props.hubEntry;
  }

  form: Form<Entry>;

  onFieldChanged: FormFieldChangeHandler<Entry> = (id, value, hasChanges) => {
    if (id.indexOf('hub_url') !== -1) {
      if (!isAdcHub(value.hub_url) && value.share_profile !== ShareProfileConstants.HIDDEN_PROFILE_ID) {
        // Reset share profile
        return Promise.resolve({ 
          share_profile: null 
        });
      }
    }

    return null;
  }

  save = () => {
    return this.form.save();
  }

  onSave: FormSaveHandler<Entry> = (changedFields) => {
    if (this.isNew()) {
      return SocketService.post(FavoriteHubConstants.HUBS_URL, changedFields);
    }

    return SocketService.patch(`${FavoriteHubConstants.HUBS_URL}/${this.props.hubEntry!.id}`, changedFields);
  }

  onFieldSetting: FormFieldSettingHandler<Entry> = (id, fieldOptions, formValue) => {
    if (id === 'share_profile') {
      Object.assign(fieldOptions, {
        // tslint:disable-next-line:max-line-length
        help: 'Custom share profiles can be selected only after entering an ADC hub address (starting with adc:// or adcs://)',
        nullOption: { value: 'null', text: 'Global default' },
        factory: t.form.Select,
        options: getFieldProfiles(this.props.profiles, formValue.hub_url),
        transformer: intTransformer,
      });
    }
  }

  render() {
    const title = this.isNew() ? 'Add favorite hub' : 'Edit favorite hub';
    return (
      <Modal 
        className="fav-hub" 
        title={ title } 
        onApprove={ this.save } 
        closable={ false } 
        icon={ IconConstants.FAVORITE } 
        { ...this.props }
      >
        <Form
          ref={ (c: any) => this.form = c }
          title="User information"
          onFieldChanged={ this.onFieldChanged }
          onFieldSetting={ this.onFieldSetting }
          onSave={ this.onSave }
          fieldDefinitions={ Fields }
          value={ this.props.hubEntry as Entry | undefined }
        />
      </Modal>
    );
  }
}

export default ModalRouteDecorator<FavoriteHubDialogProps>(
  ShareProfileDecorator(
    DataProviderDecorator<Props, DataProps>(
      FavoriteHubDialog, {
        urls: {
          hubEntry: ({ match }, socket) => {
            if (!match.params.entryId) {
              return undefined;
            }

            return socket.get(`${FavoriteHubConstants.HUBS_URL}/${match.params.entryId}`);
          }
        }
      }
    ),
    true
  ),
  OverlayConstants.FAVORITE_HUB_MODAL_ID,
  'entries/:entryId',
);