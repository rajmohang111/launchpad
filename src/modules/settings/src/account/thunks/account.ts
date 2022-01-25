import { Dispatch } from "redux";
import { AccountRestService } from "../services/rest";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { createLaunchPadErrorAction } from "../../../../../_common/actions/error";
import { createAccountUpdateAction as commonCreateAccountUpdateAction } from "../../../../../_common/actions/settings";
import { createNavigateBackAction } from "../../../../../app/actions/routing";
import { AccountUpdate } from "../models/account";
import { AccountDeviceStore } from "../services/device_store";
import { ErrorType, LaunchPadError } from "../../../../../_common/error/error";
import {
  AccountAction,
  accountLogoutErrorActionType,
  createAccountUpdateErrorAction, createAccountUpdatePendingAction,
  createLogoutAction
} from "../actions/account";
import {
  createShowLaunchpadToastAction,
  createShowLaunchpadToastActionFromError, launchpadToastDefaultDismissId
} from "../../../../../_common/components/launchpad_toast/actions/launchpad_toast";
import { LaunchpadToastType } from "../../../../../_common/models/launchpad_toast";
import { Credential } from "../../../../../_common/rest/models/rest";

export const invalidPasswordErrorMessage = "Password invalid";
export const invalidPasswordErrorMessageId = "account_current_password_mismatch";
export const changesSavedMessageId= "saved";

export const createAccountUpdateAction = (updatedAccount: AccountUpdate, credential: Credential, accountRestService: AccountRestService, accountDeviceStore: AccountDeviceStore): ThunkAction<void, RootState, void, AccountAction> =>
    async (dispatch: ThunkDispatch<RootState, void, AccountAction>): Promise<void> => {

      try {
        dispatch(createAccountUpdatePendingAction());
        await accountRestService.updateAccount(credential, updatedAccount);
        await dispatch(createReloadAccountAction(credential, accountRestService, accountDeviceStore));
        dispatch(createShowLaunchpadToastAction(changesSavedMessageId, launchpadToastDefaultDismissId, LaunchpadToastType.info));
      } catch (e) {
        dispatch(createShowLaunchpadToastActionFromError(e));
        dispatch(createAccountUpdateErrorAction(updatedAccount, e));
      }

    };

const currentPasswordValid = (currentPasswordProvided: string, currentPassword: string): boolean =>
  currentPasswordProvided ?
    currentPasswordProvided !== "" && currentPassword === currentPasswordProvided:
    false;
const createUpdatedAccountFromPasswords = (username: string, password: string): AccountUpdate => ({
  person: {},
  contact: {},
  credential: {
    username,
    password
  }
});
const updateAccountPassword = async (updatedAccount: AccountUpdate, credential: Credential, accountRestService: AccountRestService, accountDeviceStore: AccountDeviceStore, dispatch: ThunkDispatch<RootState, void, AccountAction>) => {
  try {
    await accountRestService.updateAccount(credential, updatedAccount);
  } catch (e) {
    dispatch(createShowLaunchpadToastActionFromError(e));
    dispatch(createAccountUpdateErrorAction(updatedAccount, e));
  }
  const newCredential: Credential = updatedAccount.credential as Credential;
  await dispatch(createReloadAccountAction(newCredential, accountRestService, accountDeviceStore));
  dispatch(createShowLaunchpadToastAction(changesSavedMessageId, launchpadToastDefaultDismissId, LaunchpadToastType.info));
};
export const createPasswordUpdateAction = (currentPasswordProvided: string, newPassword: string, credential: Credential, accountRestService: AccountRestService, accountDeviceStore: AccountDeviceStore): ThunkAction<void, RootState, void, AccountAction> =>
  async (dispatch: ThunkDispatch<RootState, void, AccountAction>): Promise<void> => {
    dispatch(createAccountUpdatePendingAction());
    const updatedAccount = createUpdatedAccountFromPasswords(credential.username, newPassword);
    if (currentPasswordValid(currentPasswordProvided, credential.password)) {
      return updateAccountPassword(updatedAccount, credential, accountRestService, accountDeviceStore, dispatch);
    } else {
      dispatch(createShowLaunchpadToastAction(invalidPasswordErrorMessageId));
      const error = new LaunchPadError(invalidPasswordErrorMessage, ErrorType.updateAccountPasswordMismatch);
      dispatch(createAccountUpdateErrorAction(updatedAccount, error));
    }

  };


export const createReloadAccountAction = (credential: Credential, accountRestService: AccountRestService, accountDeviceStore: AccountDeviceStore): ThunkAction<void, RootState, void, AccountAction> =>
  async (dispatch: Dispatch): Promise<void> => {

    try {
      const account = await accountRestService.loadAccount(credential);
      await accountDeviceStore.saveAccount(account);
      dispatch(commonCreateAccountUpdateAction(account));
    } catch (e) {
      const updatedAccount: AccountUpdate = {
        person: {},
        contact: {},
        credential: {
          username: credential.username
        }
      };
      dispatch(createShowLaunchpadToastActionFromError(e));
      dispatch(createAccountUpdateErrorAction(updatedAccount, e));
    }

  };

export const createLogoutNavigationActions = () =>
  createNavigateBackAction();
export const performLogout = (accountDeviceStore: AccountDeviceStore): ThunkAction<void, RootState, void, AccountAction> =>
  async (dispatch: Dispatch): Promise<void> => {

    try {
      await accountDeviceStore.clear();
      dispatch(createLogoutNavigationActions());
      dispatch(createLogoutAction());
    } catch (e) {
      dispatch(createLaunchPadErrorAction(accountLogoutErrorActionType, e));
    }


  };
