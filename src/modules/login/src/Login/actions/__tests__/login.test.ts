import {
  createSharedAccountRestServiceFixture,
  SharedAccountRestServiceFixture
} from "../../../../../../_common/rest/models/__fixture__/settings";
import { createCredentialFixture } from "../../../../../../_common/rest/__fixtures__/rest";
import { Account, Credential } from "../../../../../../_common/models/settings";
import {
  createLoginInvalidAccountAction,
  createLoginAction, createLoginErrorAction,
  createLoginPendingAction,
  createLoginSuccessAction,
  createNavigateToRegistration,
  LoginInvalidAccountAction,
  invalidAccountEmailAndInactiveMessageId,
  invalidAccountEmailMessageId,
  invalidAccountInactiveMessageId,
  LoginErrorAction,
  loginErrorType,
  loginInvalidAccountActionType,
  LoginPendingAction,
  loginRequestPendingType,
  LoginSuccessAction,
  loginSuccessActionType,
  createResetPasswordAction
} from "../login";
import { AppModule, AppModuleRoutes, createModuleSelection, } from "../../../../../../_common/models/module";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import { createAccountUpdateAction } from "../../../../../../_common/actions/settings";
import { Route } from "react-onsenui";
import { fromModuleSelection } from "../../../../../../_common/routing/routing";
import {
  createNavigateForwardAction,
  createNavigateWithResetAction,
  NavigateForwardAction
} from "../../../../../../app/actions/routing";
import {
  createSharedAccountDeviceStoreFixture,
  SharedAccountDeviceStoreFixture
} from "../../../../../../_common/stores/__fixtures__/settings";
import {
  createShowLaunchpadToastAction,
  createShowLaunchpadToastActionFromError,
  ShowLaunchpadToastAction
} from "../../../../../../_common/components/launchpad_toast/actions/launchpad_toast";
import { determineHost } from "../../../../../../_common/selectors/settings";
import { createAccountFixture } from "../../../../../../_common/models/__fixture__/settings";
import { createLoginModuleSelection, LoginNavigationModule } from "../../models/module";

describe("Login Actions", () => {

  let accountRestService: SharedAccountRestServiceFixture;
  let accountDeviceStore: SharedAccountDeviceStoreFixture;
  const account: Account = createAccountFixture();
  const credential: Required<Credential> = createCredentialFixture();
  const appModule: AppModule = AppModule.productivity;
  const dispatch = jest.fn();

  beforeEach(() => {
    accountRestService = createSharedAccountRestServiceFixture();
    accountDeviceStore = createSharedAccountDeviceStoreFixture();
    dispatch.mockClear();
  });

  describe("createLoginAction", () => {

    it("loads account, stores account and dispatches login pending, success and account update action", async () => {

      accountRestService.loadAccountFromHost.mockResolvedValue(account);
      const successActionExpected: LoginSuccessAction = {
        type: loginSuccessActionType,
        credential
      };
      const pendingActionExpected: LoginPendingAction = {
        type: loginRequestPendingType
      };
      const route: Route = fromModuleSelection(AppModuleRoutes[appModule]);
      const previousRoutes: [Route] = [fromModuleSelection(AppModuleRoutes[AppModule.launchpad])];

      await createLoginAction(credential, accountRestService, accountDeviceStore, appModule)(dispatch, jest.fn(), undefined);

      expect(accountRestService.loadAccountFromHost).toHaveBeenCalledWith(credential, determineHost(credential.region));
      expect(accountDeviceStore.saveAccount).toHaveBeenCalledWith(account);
      expect(dispatch).toHaveBeenCalledWith(createAccountUpdateAction(account));
      expect(dispatch).toHaveBeenCalledWith(pendingActionExpected);
      expect(dispatch).toHaveBeenCalledWith(successActionExpected);
      expect(dispatch).toHaveBeenCalledWith(createNavigateWithResetAction(route, previousRoutes));

    });

    it("dispatches invalid account action in case account email has not been verified", async () => {
      const accountWithNotActivatedEmail: Account = {
        ...account,
        metadata: {
          ...account.metadata,
          isEmailVerified: false
        }
      };
      accountRestService.loadAccountFromHost.mockResolvedValue(accountWithNotActivatedEmail);
      const loginActionExpected: LoginInvalidAccountAction = {
        type: loginInvalidAccountActionType,
        account: accountWithNotActivatedEmail,
        invalidProperties: ["isEmailVerified"]
      };
      const toastBarActionExpected = createShowLaunchpadToastAction(invalidAccountEmailMessageId);

      await createLoginAction(credential, accountRestService, accountDeviceStore, appModule)(dispatch, jest.fn(), undefined);

      expect(accountDeviceStore.saveAccount).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(loginActionExpected);
      expect(dispatch).toHaveBeenCalledWith(toastBarActionExpected);
    });

    it("dispatches invalid account action in case account has not been verified", async () => {
      const accountInactive: Account = {
        ...account,
        metadata: {
          ...account.metadata,
          isActive: false
        }
      };
      accountRestService.loadAccountFromHost.mockResolvedValue(accountInactive);
      const loginActionExpected: LoginInvalidAccountAction = {
        type: loginInvalidAccountActionType,
        account: accountInactive,
        invalidProperties: ["isActive"]
      };
      const toastBarActionExpected = createShowLaunchpadToastAction(invalidAccountInactiveMessageId);

      await createLoginAction(credential, accountRestService, accountDeviceStore, appModule)(dispatch, jest.fn(), undefined);

      expect(accountDeviceStore.saveAccount).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(loginActionExpected);
      expect(dispatch).toHaveBeenCalledWith(toastBarActionExpected);
    });

    it("dispatches invalid account action in case account and email has not been verified", async () => {
      const accountInactive: Account = {
        ...account,
        metadata: {
          ...account.metadata,
          isEmailVerified: false,
          isActive: false
        }
      };
      accountRestService.loadAccountFromHost.mockResolvedValue(accountInactive);
      const loginActionExpected: LoginInvalidAccountAction = {
        type: loginInvalidAccountActionType,
        account: accountInactive,
        invalidProperties: ["isEmailVerified", "isActive"]
      };
      const toastBarActionExpected = createShowLaunchpadToastAction(invalidAccountEmailAndInactiveMessageId);

      await createLoginAction(credential, accountRestService, accountDeviceStore, appModule)(dispatch, jest.fn(), undefined);

      expect(accountDeviceStore.saveAccount).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(loginActionExpected);
      expect(dispatch).toHaveBeenCalledWith(toastBarActionExpected);
    });

    it("dispatches error action in case account could not be loaded with provided credentials", async () => {

      const errorExpected = new LaunchPadError("Rest Error", ErrorType.accountRestService);
      accountRestService.loadAccountFromHost.mockRejectedValue(errorExpected);

      const actionExpected: LoginErrorAction = {
        type: loginErrorType,
        error: errorExpected,
        credential
      };

      await createLoginAction(credential, accountRestService, accountDeviceStore, appModule)(dispatch, jest.fn(), undefined);

      expect(dispatch).toHaveBeenCalledWith(actionExpected);

    });

    it("dispatches error action in case account could not be stored", async () => {

      const errorExpected = new LaunchPadError("Store Error", ErrorType.accountDeviceStore);
      accountRestService.loadAccountFromHost.mockReturnValue(account);
      accountDeviceStore.saveAccount.mockRejectedValue(errorExpected);

      const actionExpected: LoginErrorAction = {
        type: loginErrorType,
        error: errorExpected,
        credential
      };
      const showLaunchpadToastActionExpected: ShowLaunchpadToastAction = createShowLaunchpadToastActionFromError(errorExpected);

      await createLoginAction(credential, accountRestService, accountDeviceStore, appModule)(dispatch, jest.fn(), undefined);

      expect(dispatch).toHaveBeenCalledWith(actionExpected);
      expect(dispatch).toHaveBeenCalledWith(showLaunchpadToastActionExpected);

    });

  });

  describe("createLoginPendingAction", () => {

    it("creates action", () => {

      const actionExpected: LoginPendingAction = {
        type: loginRequestPendingType
      };

      expect(createLoginPendingAction()).toEqual(actionExpected);

    });

  });

  describe("createLoginSuccessAction", () => {

    it("creates action", () => {

      const actionExpected: LoginSuccessAction = {
        type: loginSuccessActionType,
        credential
      };

      expect(createLoginSuccessAction(credential)).toEqual(actionExpected);

    });

  });

  describe("createLoginErrorAction", () => {

    it("creates action", () => {

      const actionExpected: LoginErrorAction = {
        type: loginErrorType,
        error: new LaunchPadError("Test Error", ErrorType.internalError),
        credential
      };

      expect(createLoginErrorAction(actionExpected.error, credential)).toEqual(actionExpected);

    });

  });

  describe("createLoginInvalidAccountAction", () => {

    const actionExpected: LoginInvalidAccountAction = {
      type: loginInvalidAccountActionType,
      account,
      invalidProperties: ["test"]
    };

    expect(createLoginInvalidAccountAction(account, actionExpected.invalidProperties)).toEqual(actionExpected);

  });

  describe("createNavigateToRegistration", () => {

    it("creates navigation action for redirecting to registration page", () => {

      const actionExpected: NavigateForwardAction = createNavigateForwardAction(
        fromModuleSelection(createModuleSelection(AppModule.registration))
      );

      const actionReturned = createNavigateToRegistration();

      expect(actionReturned).toEqual(actionExpected);

    });

  });

  describe("createResetPasswordAction", () => {

    it("creates navigation action for redirecting to reset password page", () => {

      const actionExpected: NavigateForwardAction = createNavigateForwardAction(
        fromModuleSelection(createLoginModuleSelection(LoginNavigationModule.RESET_PASSWORD))
      );

      const resetPasswordAction = createResetPasswordAction();

      expect(resetPasswordAction).toEqual(actionExpected);

    });

  });

});
