import Reflux from 'reflux';
import SocketService from '../services/SocketService'

var TableActions = Reflux.createActions([
	{ "changeSettings": { asyncResult: true} },
  { "close": { asyncResult: true} },
  { "pause": { asyncResult: true} },
  { "filter": { asyncResult: true} }
]);

/*TableActions.getItems.listen(function(url, viewName, rangeStart, rangeEnd) {
  var that = this;
  return SocketService.get(url + "/" + rangeStart + "/" + rangeEnd)
    .then(data => that.completed(viewName, data, rangeStart, rangeEnd))
    .catch(error => this.failed(viewName, error));
});*/

TableActions.close.listen(function(viewUrl) {
  var that = this;
  return SocketService.delete(viewUrl)
    .then(data => that.completed(viewUrl))
    .catch(error => this.failed(viewUrl, error));
});

TableActions.changeSettings.listen(function(viewUrl, rangeStart, rangeEnd, sortProperty, sortAscending) {
  var that = this;
  return SocketService.post(viewUrl, { 
    range_start: rangeStart, 
    range_end: rangeEnd,
    sort_property: sortProperty,
    sort_ascending: sortAscending
  }).then(data => that.completed(viewUrl, data))
    .catch(error => this.failed(viewUrl, error));
});

TableActions.pause.listen(function(viewUrl, pause) {
  var that = this;
  return SocketService.post(viewUrl, { 
    paused: pause
  }).then(data => that.completed(viewUrl, data))
    .catch(error => this.failed(viewUrl, error));
});

TableActions.filter.listen(function(viewUrl, pattern, method = 0, property = "any") {
  var that = this;
  return SocketService.post(viewUrl + "/filter", { 
    pattern: pattern,
    method: method,
    property: property
  }).then(data => that.completed(viewUrl, data))
    .catch(error => this.failed(viewUrl, error));
});

export default TableActions;