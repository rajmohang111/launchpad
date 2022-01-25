export enum MenuItemType {
  link, component
}

export type SettingsMenuItem = MenuComponent | MenuLink;

type MenuItemCommon = {
  type: MenuItemType,
  titleId: string
};

export type MenuComponent = MenuItemCommon & {
  action: (...args: Array<any>) => void,
  params: Array<any>,
  requiresLogin: boolean
};

export type MenuLink = MenuItemCommon & {
  url: string,
  okMessageId: string
};
