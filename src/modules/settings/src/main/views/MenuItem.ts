import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import { colors, fonts } from "../../../../../_common/styles/global";
import { ListItem } from "react-onsenui";

import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { performMenuEvent } from "../services/settings";
import { MenuComponent, MenuItemType, SettingsMenuItem } from "../models/settingsmenuitem";
import { FormatMessage } from "../../../../../_common/i18n/format_message";

export type MenuItemProps = {
  row: SettingsMenuItem,
  formatMessage: FormatMessage,
  isLoggedIn: boolean
};

const menuItemStyles = {
  disabled: css({
    color: colors.mischka
  })
};

const isDisabled = (menuItem: SettingsMenuItem, isLoggedIn: boolean) => {
  if (menuItem.type === MenuItemType.component) {
    const menuItemComponent = menuItem as MenuComponent;
    return menuItemComponent.requiresLogin && !isLoggedIn;
  } else {
    return false;
  }

};
const MenuItem = ({ row, isLoggedIn, formatMessage }: MenuItemProps) => h(ListItem, {
  modifier: "tappable longdivider chevron",
  onClick: () => performMenuEvent(row, isLoggedIn, formatMessage)
}, [
    h("label", {
      className: isDisabled(row, isLoggedIn) ? cx("left", fonts.moduleTitle, menuItemStyles.disabled) : cx("left", fonts.moduleTitle)
    }, [
      h(FormattedMessage, { id: row.titleId })
    ]),
  ]);

export default MenuItem;
