'use strict';
import React from 'react';

import BrowserUtils from 'utils/BrowserUtils';

const ENTER_KEY_CODE = 13;


const MessageComposer = React.createClass({
	propTypes: {
		/**
		 * Handles sending of the message. Receives the text as param.
		 */
		handleSend: React.PropTypes.func.isRequired,
	},

	contextTypes: {
		routerLocation: React.PropTypes.object.isRequired,
	},

	getStorageKey(context) {
		return 'last_message_' + context.routerLocation.pathname;
	},

	saveText() {
		const { text } = this.state;
		BrowserUtils.saveSessionProperty(this.getStorageKey(this.context), text);
	},

	loadState(context) {
		return {
			text: BrowserUtils.loadSessionProperty(this.getStorageKey(context), ''),
		};
	},

	getInitialState: function () {
		return this.loadState(this.context);
	},

	componentWillUnmount() {
		this.saveText();
	},

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextContext.routerLocation.pathname !== this.context.routerLocation.pathname) {
			this.saveText();
			this.setState(this.loadState(nextContext));
		}
	},

	render: function () {
		return (
			<div className="ui form composer">
				<textarea
					resize="none"
					rows={ BrowserUtils.useMobileLayout() ? 1 : 2 }
					name="message"
					value={this.state.text}
					onChange={this._onChange}
					onKeyDown={this._onKeyDown}
				/>
				<div className="blue large ui icon button" onClick={ this._sendText }>
					<i className="send icon"></i>
				</div>
			</div>
		);
	},

	_onChange: function (event, value) {
		this.setState({ text: event.target.value });
	},

	_onKeyDown: function (event) {
		if (event.keyCode === ENTER_KEY_CODE) {
			event.preventDefault();
			this._sendText();
		}
	},

	_sendText() {
		// Trim only from end to allow chat messages such as " +help" to be
		// sent to other users
		// This will also prevent sending empty messages
		const text = this.state.text.replace(/\s+$/, '');

		if (text) {
			this.props.handleSend(text);
		}

		this.setState({ text: '' });
	}
});

export default MessageComposer;