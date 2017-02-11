import React from 'react';

import DataProviderDecorator from 'decorators/DataProviderDecorator';
import RedrawDecorator from 'decorators/RedrawDecorator';
import ValueFormat from 'utils/ValueFormat';

import LayoutHeader from 'components/semantic/LayoutHeader';
import { ListItem } from 'components/semantic/List';


const RecentLayout = DataProviderDecorator(RedrawDecorator(({ entries, entryTitleRenderer, hasSession, entryIcon }) => {
	if (entries.length === 0) {
		return null;
	}

	return (
		<div className="recents">
			<LayoutHeader
				title="Recent sessions"
				size="medium"
			/>
			<div className="ui relaxed divided list">
				{ entries.map((entry, index) => (
						<ListItem 
							key={ index }
							header={ entryTitleRenderer(entry) }
							description={ entry.last_opened ? ('Opened ' + ValueFormat.formatRelativeTime(entry.last_opened)) : null }
							icon={ (hasSession(entry) ? 'green ' : '') + entryIcon }
						/>
					)) }
			</div>
		</div>
	);
}), {
	urls: {
		entries: ({ url }, socket) => socket.get(url + '/10'),
	},
});

RecentLayout.propTypes = {
	/**
	 * Title of the button
	 */
	entryIcon: React.PropTypes.string.isRequired,

	/**
	 * URL for fetching the recent entries
	 */
	url: React.PropTypes.string.isRequired,

	/**
	 * Renders the recent entry title
	 */
	entryTitleRenderer: React.PropTypes.func.isRequired,

	/**
	 * Returns whether the recent entry is currently active
	 */
	hasSession: React.PropTypes.func.isRequired,
};

export default RecentLayout;