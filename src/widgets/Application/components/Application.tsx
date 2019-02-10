import React from 'react';

import StatisticsDecorator from 'decorators/StatisticsDecorator';

import WidgetDropdown from './WidgetDropdown';

import SystemConstants from 'constants/SystemConstants';

import { ListItem } from 'components/semantic/List';
import { formatRelativeTime } from 'utils/ValueFormat';

import LoginStore from 'stores/LoginStore';

import '../style.css';
import * as UI from 'types/ui';


type StatisticsProps = Pick<UI.WidgetProps, 'widgetT'>;

const Statistics = StatisticsDecorator<any, StatisticsProps>(
  ({ stats, widgetT }) => (
    <div className="ui list">
      <ListItem 
        header={ widgetT('loggedInAs', 'Logged in as') } 
        description={ LoginStore.user.username }
      />
      <ListItem 
        header={ widgetT('clientStarted', 'Client started') } 
        description={ formatRelativeTime(LoginStore.systemInfo.client_started) }
      />
      <ListItem 
        header={ widgetT('activeSessions', 'Active sessions') } 
        description={ stats.active_sessions }
      />
    </div>
  ), 
  SystemConstants.STATS_URL, 
  'Failed to fetch information', 
  10
);


export type ApplicationProps = UI.WidgetProps;

class Application extends React.PureComponent<ApplicationProps> {
  static propTypes = {

  };

  render() {
    const { widgetT } = this.props;
    return (
      <div className="application-container">
        <Statistics widgetT={ widgetT }/>
        <WidgetDropdown
          componentId={ this.props.componentId }
          widgetT={ widgetT }
        />
      </div>
    );
  }
}

export default Application;