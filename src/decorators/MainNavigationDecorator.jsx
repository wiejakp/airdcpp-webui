import React from 'react';
import Reflux from 'reflux';

import HubSessionStore from 'stores/HubSessionStore';
import PrivateChatSessionStore from 'stores/PrivateChatSessionStore';
import 'stores/FilelistSessionStore'; // must be required here for now
import LogStore from 'stores/LogStore';

const MainNavigationItems = [
	{
		title: 'Home',
		url: '/',
		icon: 'home',
	}, {
		title: 'Favorites',
		url: '/favorite-hubs',
		icon: 'yellow star',
	}, {
		title: 'Queue',
		url: '/queue',
		icon: 'green download',
	}, {
		title: 'Search',
		url: '/search',
		icon: 'search',
	}, {
		title: 'Settings',
		url: '/settings',
		icon: 'configure',
	}
];

const SecondaryMenuItems = [
	{
		title: 'Hubs',
		url: '/hubs',
		icon: 'blue sitemap',
		unreadInfoStore: HubSessionStore,
	}, {
		title: 'Messages',
		url: '/messages',
		icon: 'blue comments',
		unreadInfoStore: PrivateChatSessionStore,
	}, {
		title: 'Filelists',
		url: '/filelists',
		icon: 'blue browser',
	}, {
		title: 'Events',
		url: '/events',
		icon: 'blue history',
		unreadInfoStore: LogStore,
	}
];

export default function (Component) {
	const MainNavigationDecorator = React.createClass({
		mixins: [ Reflux.connect(PrivateChatSessionStore, 'chatSessions'), Reflux.connect(HubSessionStore, 'hubSessions'), Reflux.connect(LogStore, 'logMessages') ],
		render() {
			return (
				<Component 
					{...this.props} 
					secondaryMenuItems={ SecondaryMenuItems } 
					mainMenuItems={ MainNavigationItems }
				/>
			);
		}
	});

	return MainNavigationDecorator;
}