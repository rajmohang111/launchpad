import { ModuleSelection } from "../../../../../_common/models/module";
import Preferences from "../../preferences/containers/Preferences";
import About from "../../about/containers/Main";
import Account from "../../account/containers/Account";
import Imprint from "../../imprint/containers/Imprint";

export enum SettingsModule {
  PREFERENCES = "PREFERENCES",
  ABOUT = "ABOUT",
  ACCOUNT = "ACCOUNT",
  IMPRINT = "IMPRINT"
}

export const settingsModuleRoutes: Record<SettingsModule, ModuleSelection> = {
  [SettingsModule.PREFERENCES]: { component: Preferences, key: "preferences" },
  [SettingsModule.ABOUT]: { component: About, key: "about" },
  [SettingsModule.ACCOUNT]: { component: Account, key: "account" },
  [SettingsModule.IMPRINT]: { component: Imprint, key: "imprint" },
};

export const createSettingsModuleSelection = (settingsModule: SettingsModule): ModuleSelection => settingsModuleRoutes[settingsModule];
