import { createI18NFixture } from "../../../../../../_common/i18n/__fixtures__/i18n";

jest.mock("../../../../../../_common/inAppBrowser/inAppBrowser", () => ({open: jest.fn()}));
import { performMenuEvent } from "../settings";
import { PageSelectionActions } from "../../views/Main";
import { SettingsModule, settingsModuleRoutes } from "../../models/module";

import { open } from "../../../../../../_common/inAppBrowser/inAppBrowser";
import { MenuComponent, MenuItemType, MenuLink } from "../../models/settingsmenuitem";

describe("Settings Service", () => {

  const pageSelectActions: PageSelectionActions = {
    onSettingsSelectAction: jest.fn(),
    onAccountSelectAction: jest.fn(),
    onNavigateBack: jest.fn()
  };

  const i18nFixture = createI18NFixture();

  beforeEach(() => {
    (pageSelectActions.onSettingsSelectAction as jest.Mock).mockClear();
    (pageSelectActions.onAccountSelectAction as jest.Mock).mockClear();
    (pageSelectActions.onNavigateBack as jest.Mock).mockClear();
  });

  describe("performMenuEvent", () => {

    describe("MenuLink", () => {

      const menuLink: MenuLink = {
        type: MenuItemType.link,
        titleId: "Test",
        url: "www.google.de",
        okMessageId: "testMessageId"
      };

      it("opens link", () => {

        performMenuEvent(menuLink, true, i18nFixture.formatMessage);
        expect(open).toHaveBeenCalled();
        expect(i18nFixture.formatMessage).toHaveBeenCalledWith(menuLink.okMessageId);

      });

    });

    describe("MenuComponent", () => {

      const menuComponent: MenuComponent = {
        type: MenuItemType.component,
        titleId: "Test",
        action: pageSelectActions.onSettingsSelectAction,
        params: [settingsModuleRoutes[SettingsModule.PREFERENCES]],
        requiresLogin: false
      };

      it("performs action in case user is not logged in but action does not require log in", () => {

        performMenuEvent(menuComponent, false, i18nFixture.formatMessage);
        expect(pageSelectActions.onSettingsSelectAction).toHaveBeenCalledWith(settingsModuleRoutes[SettingsModule.PREFERENCES]);

      });

      it("performs action in case user is logged in but action does require log in", () => {

        const menuComponentLoginRequired: MenuComponent = {
          ...menuComponent,
          requiresLogin: true
        };

        performMenuEvent(menuComponentLoginRequired, true, i18nFixture.formatMessage);
        expect(pageSelectActions.onSettingsSelectAction).toHaveBeenCalledWith(settingsModuleRoutes[SettingsModule.PREFERENCES]);

      });

      it("does nothing in case user is not logged in and action does require login", () => {

        const menuComponentLoginRequired: MenuComponent = {
          ...menuComponent,
          requiresLogin: true
        };

        performMenuEvent(menuComponentLoginRequired, false, i18nFixture.formatMessage);
        expect(pageSelectActions.onSettingsSelectAction).not.toHaveBeenCalled();

      });

    });

  });
});
