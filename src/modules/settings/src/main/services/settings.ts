import { open } from "../../../../../_common/inAppBrowser/inAppBrowser";
import { MenuComponent, MenuItemType, MenuLink, SettingsMenuItem } from "../models/settingsmenuitem";
import { FormatMessage } from "../../../../../_common/i18n/format_message";

const shouldPerform = (isLoggedIn: boolean, requiresLogin: boolean) => isLoggedIn || !requiresLogin;

const performMenuLinkEvent = (menuLink: MenuLink, formatMessage: FormatMessage) => open(menuLink.url, formatMessage(menuLink.okMessageId));
const performMenuComponentEvent = (menuComponent: MenuComponent, isLoggedIn: boolean) => {
  if (shouldPerform(isLoggedIn, menuComponent.requiresLogin)) {
    menuComponent.action(...menuComponent.params);
  }
};

export const performMenuEvent = (row: SettingsMenuItem, isLoggedIn: boolean, formatMessage: FormatMessage) => {

  if (row.type === MenuItemType.link) {
    performMenuLinkEvent(row as MenuLink, formatMessage);
  } else {
    performMenuComponentEvent(row as MenuComponent, isLoggedIn);
  }


};
