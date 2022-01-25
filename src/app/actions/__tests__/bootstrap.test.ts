import { BootstrapAction, bootstrapActionType, createBootstrapAction } from "../bootstrap";
import { createTestDeviceStores, TestDeviceStores } from "../../../_common/storage/__test_data__/test_device_store";
import { createInitRootState } from "../../../main/reducers/main";
import { createInitSettings, Settings } from "../../../modules/settings/src/_common/device_store";
import { Locale } from "../../../_common/i18n/IntlProvider";
import { createUpdateTranslationAction, UpdateTranslationsAction } from "../translation";
import { createNavigateWithResetAction, NavigateWithResetAction } from "../routing";
import { Route } from "react-onsenui";
import { AppModule, createModuleSelection } from "../../../_common/models/module";
import { Language } from "../../../_common/models/settings";
import { fromModuleSelection } from "../../../_common/routing/routing";
import { createAccountFixture } from "../../../_common/models/__fixture__/settings";

describe("App Action Creator", () => {

  const state = createInitRootState();
  const dispatch = jest.fn();
  let testStores: TestDeviceStores;

  beforeEach(() => {
    testStores = createTestDeviceStores();
  });

  describe("createBootstrapAction", () => {

    const storedSettings: Settings = {
      preference: {
        language: Language.en,
        hideTutorial: false
      },
      account: createAccountFixture()
    };

    const bootstrapActionExpected: BootstrapAction = {
      type: bootstrapActionType,
      deviceStore: {
        settings: storedSettings
      }
    };

    const updateTranslationActionExpected: UpdateTranslationsAction = createUpdateTranslationAction(Locale[storedSettings.preference.language]);

    const launchPadRoute: Route = fromModuleSelection(createModuleSelection(AppModule.launchpad));
    const tutorialRoute: Route = fromModuleSelection(createModuleSelection(AppModule.tutorial));

    it("load device data and dispatches bootstrapping actions", async () => {

      testStores.settingsDeviceStores.settingsDeviceStore.loadSettings.mockResolvedValue(storedSettings);

      const moduleSelectionActionExpected: NavigateWithResetAction = createNavigateWithResetAction(tutorialRoute, [launchPadRoute]);

      await createBootstrapAction(testStores)(dispatch, () => state, undefined);

      expect(dispatch).toHaveBeenCalledWith(bootstrapActionExpected);
      expect(dispatch).toHaveBeenCalledWith(updateTranslationActionExpected);
      expect(dispatch).toHaveBeenCalledWith(moduleSelectionActionExpected);

    });

    it("loads launchpad module in case tutorial is hidden", async () => {

      const settingsWithTutorialsHidden: Settings = {
        ...storedSettings,
        preference: {
          ...storedSettings.preference,
          hideTutorial: true
        }
      };

      testStores.settingsDeviceStores.settingsDeviceStore.loadSettings.mockResolvedValue(settingsWithTutorialsHidden);

      const moduleSelectionActionExpected: NavigateWithResetAction = createNavigateWithResetAction(launchPadRoute);

      await createBootstrapAction(testStores)(dispatch, () => state, undefined);

      expect(dispatch).toHaveBeenCalledWith(moduleSelectionActionExpected);

    });

    it("sets init state for settings in case nothing is stored in local store", async () => {

      testStores.settingsDeviceStores.settingsDeviceStore.loadSettings.mockResolvedValue(null);

      const actionExpected: BootstrapAction = {
        type: bootstrapActionType,
        deviceStore: {
          settings: createInitSettings()
        }
      };

      await createBootstrapAction(testStores)(dispatch, () => state, undefined);

      expect(dispatch).toHaveBeenCalledWith(actionExpected);

    });

  });

});
