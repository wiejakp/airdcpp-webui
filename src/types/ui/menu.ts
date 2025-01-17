import * as API from 'types/api';
import * as UI from 'types/ui';

export interface ActionMenuData<ItemDataT extends UI.ActionMenuItemDataValueType> {
  ids?: string[];
  actions: UI.ModuleActions<ItemDataT>;
  itemData?: UI.ActionMenuItemDataType<ItemDataT>;
  entityId?: API.IdType;
}

export type MenuItemClickHandler = () => void;

export type ActionMenuFilterType<ItemDataT extends UI.ActionMenuItemDataValueType> = (
  action: UI.ActionType<ItemDataT>, 
  itemData: ItemDataT
) => boolean;

export interface ActionMenuType<ItemDataT> {
  actionIds: string[];
  itemDataGetter: (() => ItemDataT);
  actions: UI.ModuleActions<ItemDataT>;
}
