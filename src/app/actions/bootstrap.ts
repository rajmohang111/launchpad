import { Action, Dispatch } from "redux";
import { createInitSettings, Settings } from "../../modules/settings/src/_common/device_store";
import { DeviceStores } from "../../_common/storage/device_store";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../main/reducers/main";
import { createUpdateTranslationAction } from "./translation";
import { createNavigateWithResetAction } from "./routing";
import { AppModule, AppModuleRoutes } from "../../_common/models/module";
import { determineInitModule } from "../services/module_selector";
import { fromModuleSelection } from "../../_common/routing/routing";
import { Locale } from "../../_common/i18n/IntlProvider";
import { AppStateAction } from "./appstate";

export interface BootstrapAction extends Action {
  deviceStore: {
    settings: Settings
  };
}
export type AppAction = BootstrapAction | AppStateAction;

export const bootstrapActionType = "LAUNCHPAD_BOOTSTRAP";


const bootstrapSettings = (settings: Settings | null) =>
  settings ?
    settings:
    createInitSettings();

const bootstrapTranslations = (settings: Settings, dispatch: Dispatch) => dispatch(createUpdateTranslationAction(Locale[settings.preference.language]));

const bootstrapModule = (settings: Settings, dispatch: Dispatch) =>
  determineInitModule(settings.preference.hideTutorial) === AppModule.launchpad ?
    dispatch(createNavigateWithResetAction(fromModuleSelection(AppModuleRoutes[AppModule.launchpad]))):
    dispatch(createNavigateWithResetAction(
      fromModuleSelection(AppModuleRoutes[AppModule.tutorial]),
      [fromModuleSelection(AppModuleRoutes[AppModule.launchpad])]
    ));

export const createBootstrapAction = (stores: DeviceStores): ThunkAction<void, RootState, void, AppAction> => async (dispatch: Dispatch): Promise<BootstrapAction> => {

  const settings = bootstrapSettings(await stores.settingsDeviceStores.settingsDeviceStore.loadSettings());
  bootstrapTranslations(settings, dispatch);
  bootstrapModule(settings, dispatch);
  return dispatch({
    type: bootstrapActionType,
    deviceStore: {
      settings
    }
  });
};
