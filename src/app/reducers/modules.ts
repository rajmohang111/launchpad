import { combineReducers } from "redux";
import {
  createLaunchPadInitState,
  default as launchPadReducer,
  LaunchPadState
} from "../../modules/launchpad/src/main/reducers/launchpad";
import {
  createSlideInitState,
  default as tutorialReducer,
  tutorialState
} from "../../modules/tutorials/src/main/reducers/tutorial";
import {
  createSettingsInitState,
  default as settingsReducer,
  SettingsState
} from "../../modules/settings/src/main/reducers/settings";
import {
  createProductivityInitState,
  default as productivityReducer,
  ProductivityState
} from "../../modules/productivity/src/main/reducers";
import loginReducer, { createLoginInitState, LoginState } from "../../modules/login/src/Login/reducers/login";
import registrationReducer, {
  createRegistrationInitState,
  RegistrationState
} from "../../modules/registration/src/main/reducers/registration";

export type ModulesState = {
  tutorial: tutorialState,
  launchPad: LaunchPadState,
  settings: SettingsState,
  productivity: ProductivityState,
  login: LoginState,
  registration: RegistrationState
};

export const createModulesInitState = (): ModulesState => ({
  tutorial: createSlideInitState(),
  launchPad: createLaunchPadInitState(),
  settings: createSettingsInitState(),
  productivity: createProductivityInitState(),
  login: createLoginInitState(),
  registration: createRegistrationInitState()
});

const moduleReducer = combineReducers<ModulesState>({
  launchPad: launchPadReducer,
  tutorial: tutorialReducer,
  settings: settingsReducer,
  productivity: productivityReducer,
  login: loginReducer,
  registration: registrationReducer
});

export default moduleReducer;
