import SocketStore from 'stores/SocketStore';
import TableActions from 'actions/TableActions';

import invariant from 'invariant';


export default {
	listenables: TableActions,
	init() {
		this._items = [];
		this._startPos = 0;
		this._rowCount = 0;
		this._active = false;
	},

	onStartCompleted(viewUrl, data) {
		// Parse the total item count
		this._parseDataProperties(data);
		this.trigger(null);
	},

	onClose(viewUrl) {
		if (viewUrl !== this.viewUrl) {
			return;
		}

		this._removeMessageListener();
		this.clear();

		//this._entityId = null;
		this._active = false;
	},

	onClear(viewUrl) {
		if (viewUrl !== this.viewUrl) {
			return;
		}

		this.clear();
	},

	onInit(viewUrl, entityId) {
		if (viewUrl !== this.viewUrl) {
			return;
		}

		invariant(!this._active, 'Trying start an active table view');

		this._entityId = entityId;
		this.addMessageListener();
		this._active = true;
	},

	addMessageListener() {
		this._removeMessageListener = SocketStore.addMessageListener(this._viewName + '_updated', this._handleUpdate, this._entityId);
	},

	clear() {
		this._items = [];
		this._startPos = 0;
		this._rowCount = 0;
		this._items = [];
		this.trigger();
	},

	get items() {
		return this._items;
	},

	get viewUrl() {
		let viewUrl = this._apiUrl + '/';
		if (this._entityId) {
			viewUrl += this._entityId + '/';
		}

		viewUrl += this._viewName;
		return viewUrl;
	},

	get viewName() {
		return this._viewName;
	},

	get rowCount() {
		return this._rowCount;
	},

	get active() {
		return this._active;
	},

	_addItems(itemsObj) {
		this._items = itemsObj.reduce((newViewItems, rawItem, index) => {
			// Either a new item, existing one in a different position or we are updating properties
			let viewItem = this._findItem(rawItem.id) || { id: rawItem.id };

			if (rawItem.properties) {
				viewItem = Object.assign({}, viewItem, rawItem.properties);
			} else if (Object.keys(viewItem).length == 1) {
				console.error('No properties were sent for a new view item', viewItem.id);
			}

			newViewItems[this._startPos + index] = viewItem;

			return newViewItems;
		}.bind(this), []);
	},

	_findItem(id) {
		return this._items.find(item => !item ? false : item.id === id );
	},

	_parseDataProperties(data) {
		if (data.range_start != undefined) {
			this._startPos = data.range_start;
		}

		if (data.total_items != undefined) {
			this._rowCount = data.total_items;
		}

		if (data.items != undefined) {
			this._addItems(data.items);
		}
	},

	_handleUpdate(data) {
		this._parseDataProperties(data);
		this.trigger(this._items, data.range_offset);
	}
};
