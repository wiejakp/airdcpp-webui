import React from 'react';
import Format from 'utils/Format.js'
import LogActions from 'actions/LogActions'

const LogMessage = React.createClass({
  render: function() {
    let iconClass;
    switch(this.props.message.severity) {
      case 0: iconClass = 'blue info circle'; break;
      case 1: iconClass = 'yellow warning sign'; break;
      case 2: iconClass = 'red warning circle'; break;
    }

    return (
      <div className="ui row message">
        <div className="ui column one wide">
          <Icon className={ iconClass }/>
        </div>
        <div className="ui column twelve wide">
          { this.props.message.text }
        </div>
        <div className="ui column three wide">
          { Format.formatTimestamp(this.props.message.time) }
        </div>
      </div>
    );
  }
});

export default React.createClass({
  componentWillMount: function() {
    LogActions.resetLogCounters();
  },

  componentWillUpdate: function() {
    let node = React.findDOMNode(this.refs.messageList);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  },
   
  componentDidUpdate: function() {
    if (this.shouldScrollBottom) {
      let node = React.findDOMNode(this.refs.messageList);
      node.scrollTop = node.scrollHeight
    }
  },

  render: function() {
    const messageList = this.props.log_messages.map(function (message) {
      return (
        <LogMessage key={ message.id } message={message}/>
      );
    });

    return (
      <div className="systemlogBox">
        <div className="ui header">System log</div>
        <div ref="messageList" className="ui grid messageList three column divided" style={{maxHeight: 300 + 'px', overflowY: 'auto'}}>
          {messageList}
        </div>
      </div>
    );
  }
});