import {createSelector, Selector} from "reselect";
import {fromNullable} from "fp-ts/lib/Option";
import {SettingsState} from "../../modules/settings/src/main/reducers/settings";
import {getModules} from "./modules";
import {AccountState} from "../../modules/settings/src/account/reducers/account";
import {RootState} from "../../main/reducers/main";
import {Account, Credential} from "../models/settings";
import {Region} from "../models/system";
import {adamosHost, adamosHostChina, adamosHostDEV} from "../rest/models/rest";

export const getSettings: Selector<RootState, SettingsState> = createSelector(
  [getModules],
  modulesState => modulesState.settings
);

export const getAccountState: Selector<RootState, AccountState> = createSelector(
  [getSettings],
  settingsState => settingsState.account
);

export const getAccount: Selector<RootState, Account> = createSelector(
  [getAccountState],
  accountState => accountState.account
);

export const getAccountCredential: Selector<RootState, Credential> = createSelector(
  [getAccount],
  account => fromNullable(account.credential)
    .getOrElse({
      region: Region.OTHER,
      username: "",
      password: "",
    })
);

export const determineHost = (region: Region) => {
  switch (region) {
    case Region.CHINA: {
      return adamosHostChina;
    }
    case Region.OTHER: {
      return adamosHost;
    }
    case Region.DEVELOPMENT: {
      return adamosHostDEV;
    }
    default: {
      return adamosHostDEV;
    }
  }
};

const isCredentialValid = (credential: Credential): boolean =>
  credential.username !== undefined && credential.username !== null && credential.username !== "" &&
  credential.password !== undefined && credential.password !== null && credential.password !== "";
export const isLoggedIn: Selector<RootState, boolean> = createSelector(
  [getAccountState],
  (accountState: AccountState) => fromNullable(accountState.account.credential)
    .map(isCredentialValid)
    .getOrElse(false)
);
