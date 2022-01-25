import * as React from "react";
import * as h from "react-hyperscript";
import { List, Page } from "react-onsenui";

import { SettingsModule } from "../models/module";
import MenuItem from "./MenuItem";
import { MenuComponent, MenuItemType, MenuLink, SettingsMenuItem } from "../models/settingsmenuitem";
import { simpleToolbarCreator } from "../../../../../_common/toolbar/factory";
import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import { settingsModuleName } from "../../../../../_common/i18n/message/translations";
import { AccountRestService } from "../../account/services/rest";
import { I18N, InjectedI18NProps } from "../../../../../_common/i18n/components/I18N";
import { FormatMessage } from "../../../../../_common/i18n/format_message";
import ModuleMenu from "../../../../../_common/components/module_menu/components/ModuleMenu";
import { Credential } from "../../../../../_common/rest/models/rest";
import { createSettingsLeftElement } from "../../_common/toolbar";
import { css } from "emotion";
import { background } from "../../../../../_common/styles/global";


export type PageSelectionActions = ToolbarActions & {
  onSettingsSelectAction: (selectedModule: SettingsModule) => void;
  onAccountSelectAction: (credential: Credential, accountRestService: AccountRestService) => void;
};

export type SettingsProps = {
  isLoggedIn: boolean,
  actions: PageSelectionActions
};

const menuStyles = {
  menu: css({
    height: "100%",
    background: background.mainGradient
  })
};

export const createSettingsMenuList = (actions: PageSelectionActions): Array<SettingsMenuItem> => [
  { type: MenuItemType.component, titleId: "settings_preference", params: [SettingsModule.PREFERENCES], action: actions.onSettingsSelectAction, requiresLogin: false } as MenuComponent,
  { type: MenuItemType.component, titleId: "settings_account", action: actions.onAccountSelectAction, params: [], requiresLogin: true } as MenuComponent,
  { type: MenuItemType.link, titleId: "settings_privacy_policy", url: "https://km-df.com/product/k.management/legal/privacy-policy/", okMessageId: "agree" } as MenuLink,
  { type: MenuItemType.link, titleId: "settings_term_of_use", url: "https://km-df.com/product/k.management/legal/terms-of-use/", okMessageId: "agree" } as MenuLink,
  { type: MenuItemType.component, titleId: "settings_imprint", params: [SettingsModule.IMPRINT], action: actions.onSettingsSelectAction } as MenuComponent,
  { type: MenuItemType.component, titleId: "settings_about_productivity", params: [SettingsModule.ABOUT], action: actions.onSettingsSelectAction, requiresLogin: false }
];

const renderRow = (formatMessage: FormatMessage, isLoggedIn: boolean) => (row: SettingsMenuItem) => React.createElement(MenuItem, { row, key: row.titleId, isLoggedIn, formatMessage });

const Main = ({ isLoggedIn, actions }: SettingsProps) =>

  h(Page, {
    renderToolbar: simpleToolbarCreator(settingsModuleName,
      createSettingsLeftElement(actions.onNavigateBack)
    )
  }, [
      h(ModuleMenu, {
        component: () =>
          h(I18N, {
            component: (i18nContext: InjectedI18NProps) =>
              h(List, { className: menuStyles.menu, dataSource: createSettingsMenuList(actions), renderRow: renderRow(i18nContext.intl.formatMessage, isLoggedIn) })
          })
      })
    ]);


export default Main;
