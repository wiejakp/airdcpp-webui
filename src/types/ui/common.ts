
import { TFunction } from 'react-i18next';
import * as API from 'types/api';

export interface SearchTypeItem {
  id: string | null;
  str: string;
}

export interface ScrollPositionHandler {
  getScrollData: (id?: API.IdType) => number | undefined;
  setScrollData: (data: number | undefined, id?: API.IdType) => void;
}

export enum FileSelectModeEnum {
  FILE,
  DIRECTORY,
  EXISTING_FILE,
}

export interface IdItemType {
  id: API.IdType;
}

export type TranslateF = TFunction;

export type EmptyObject = Record<string, never>;

export type PropsWithChildren = {
  children: React.ReactNode;
}
