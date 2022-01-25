import { combineReducers } from "redux";

import {
  PreferencesState,
  createPreferencesStateInitState,
  default as preferencesReducer
} from "../../preferences/reducers/preferences";
import {
  AccountState,
  default as accountReducer,
  createAccountStateInitState
} from "../../account/reducers/account";

export type SettingsState = {
  preferences: PreferencesState
  account: AccountState
};

export const createSettingsInitState = (): SettingsState => ({
  preferences: createPreferencesStateInitState(),
  account: createAccountStateInitState()
});

const settingsReducer = combineReducers({
  preferences: preferencesReducer,
  account: accountReducer
});

export default settingsReducer;
