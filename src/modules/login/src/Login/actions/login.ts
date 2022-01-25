import { SharedAccountRestService } from "../../../../../_common/rest/models/settings";
import { AppModule, AppModuleRoutes, createModuleSelection } from "../../../../../_common/models/module";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { LaunchPadErrorAction } from "../../../../../_common/actions/error";
import { Action, Dispatch } from "redux";
import { Account, Credential } from "../../../../../_common/models/settings";
import { createAccountUpdateAction } from "../../../../../_common/actions/settings";
import {
  createNavigateForwardAction,
  createNavigateWithResetAction,
  NavigateForwardAction
} from "../../../../../app/actions/routing";
import { fromModuleSelection } from "../../../../../_common/routing/routing";
import { SharedAccountDeviceStore } from "../../../../../_common/stores/settings";
import { LaunchPadError } from "../../../../../_common/error/error";
import {
  createShowLaunchpadToastAction,
  createShowLaunchpadToastActionFromError, ShowLaunchpadToastAction
} from "../../../../../_common/components/launchpad_toast/actions/launchpad_toast";
import { determineHost } from "../../../../../_common/selectors/settings";

export const invalidAccountEmailMessageId = "login_email_not_verified";
export const invalidAccountInactiveMessageId = "login_account_inactive";
export const invalidAccountEmailAndInactiveMessageId = "login_account_inactive_and_email_not_verified";

export const loginSuccessActionType = "LOGIN_SUCCESS";
export const loginErrorType = "LOGIN_ERROR";
export const loginRequestPendingType = "LOGIN_PENDING";
export const loginInvalidAccountActionType = "LOGIN_ACCOUNT_INVALID";
import { createLoginModuleSelection, LoginNavigationModule } from "../models/module";

export type LoginSuccessAction = Action & {
  credential: Credential;
};

export type LoginErrorAction = LaunchPadErrorAction & {
  credential: Credential
};

export type LoginPendingAction = Action;

export type LoginInvalidAccountAction = Action & {
  account: Account,
  invalidProperties: Array<string>
};

export type LoginAction =
  LoginSuccessAction |
  LoginErrorAction |
  LoginPendingAction |
  LoginInvalidAccountAction |
  NavigateForwardAction;

const dispatchLoginNavigationActions = (redirectModule: AppModule, dispatch: Dispatch) =>
  dispatch(createNavigateWithResetAction(
    fromModuleSelection(AppModuleRoutes[redirectModule]),
    [fromModuleSelection(AppModuleRoutes[AppModule.launchpad])]
  ));
const isAccountValid = (account: Account): boolean => account.metadata && account.metadata.isActive && account.metadata.isEmailVerified;
const gatherInvalidAccountProps = (account: Account): Array<string> =>
  account.metadata ?
    Object.keys(account.metadata)
      .filter(key => key === "isEmailVerified" || key === "isActive")
      .filter(key => account.metadata[key] === false) :
    [];
const createShowInvalidAccountToastAction = (account: Account): ShowLaunchpadToastAction | null =>
  !account.metadata ?
    createShowLaunchpadToastAction(invalidAccountEmailAndInactiveMessageId) :
    !account.metadata.isActive ?
      !account.metadata.isEmailVerified ?
        createShowLaunchpadToastAction(invalidAccountEmailAndInactiveMessageId) :
        createShowLaunchpadToastAction(invalidAccountInactiveMessageId) :
      !account.metadata.isEmailVerified ?
        createShowLaunchpadToastAction(invalidAccountEmailMessageId) :
        null;
export const createLoginAction = (credential: Required<Credential>, accountRestService: SharedAccountRestService, accountDeviceStore: SharedAccountDeviceStore, redirectModule: AppModule): ThunkAction<void, RootState, void, LoginAction> =>
  async (dispatch: Dispatch) => {

    try {
      dispatch(createLoginPendingAction());
      const account = await accountRestService.loadAccountFromHost(credential, determineHost(credential.region));
      if (isAccountValid(account)) {
        await accountDeviceStore.saveAccount(account);
        dispatch(createAccountUpdateAction(account));
        dispatch(createLoginSuccessAction(credential));
        dispatchLoginNavigationActions(redirectModule, dispatch);
      } else {
        dispatch(createLoginInvalidAccountAction(account, gatherInvalidAccountProps(account)));
        const showToastAction = createShowInvalidAccountToastAction(account);
        // Should never occur as account has been/should be checked before dispatch
        if (showToastAction != null) {
          dispatch(showToastAction);
        }
      }

    } catch (e) {
      dispatch(createShowLaunchpadToastActionFromError(e));
      dispatch(createLoginErrorAction(e, credential));
    }

  };

export const createLoginPendingAction = (): LoginPendingAction => ({
  type: loginRequestPendingType
});

export const createLoginSuccessAction = (credential: Credential): LoginSuccessAction => ({
  type: loginSuccessActionType,
  credential
});

export const createLoginErrorAction = (error: LaunchPadError, credential: Credential): LoginErrorAction => ({
  type: loginErrorType,
  error,
  credential
});

export const createLoginInvalidAccountAction = (account: Account, invalidProperties: Array<string>): LoginInvalidAccountAction => ({
  type: loginInvalidAccountActionType,
  account,
  invalidProperties
});

export const createNavigateToRegistration = (): LoginAction =>
  createNavigateForwardAction(fromModuleSelection(
    createModuleSelection(AppModule.registration)
  ));

export const createResetPasswordAction = () =>
  createNavigateForwardAction(
    fromModuleSelection(createLoginModuleSelection(LoginNavigationModule.RESET_PASSWORD))
  );
