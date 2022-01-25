import {
  changesSavedMessageId,
  createAccountUpdateAction,
  createPasswordUpdateAction,
  createReloadAccountAction,
  invalidPasswordErrorMessage,
  invalidPasswordErrorMessageId,
  performLogout,
} from "../account";
import {Account} from "../../../../../../_common/models/settings";
import {
  AccountRestServiceFixture,
  createAccountRestServiceFixture
} from "../../services/__fixtures__/rest";
import {ErrorType, LaunchPadError} from "../../../../../../_common/error/error";
import {
  AccountUpdateAction,
  createAccountUpdateAction as createCommonAccountUpdateAction
} from "../../../../../../_common/actions/settings";
import {createNavigateBackAction} from "../../../../../../app/actions/routing";
import {AccountUpdate} from "../../models/account";
import {
  AccountDeviceStoreFixture,
  createAccountDeviceStoreFixture
} from "../../services/__fixtures__/device_store";
import configureStore from "redux-mock-store";
import thunk, {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../../../../../main/reducers/main";
import {expectLaunchPadError} from "../../../../../../__test_util__/error";
import {
  AccountAction,
  accountLogoutActionType,
  accountLogoutErrorActionType,
  accountUpdateActionErrorType,
  createAccountUpdateErrorAction,
  createAccountUpdatePendingAction,
  LogoutErrorAction,
  UpdateAccountErrorAction
} from "../../actions/account";
import {
  createShowLaunchpadToastAction,
  createShowLaunchpadToastActionFromError,
  launchpadToastDefaultDismissId
} from "../../../../../../_common/components/launchpad_toast/actions/launchpad_toast";
import {LaunchpadToastType} from "../../../../../../_common/models/launchpad_toast";
import {Credential} from "../../../../../../_common/rest/models/rest";
import {Region} from "../../../../../../_common/models/system";
import { createAccountFixture } from "../../../../../../_common/models/__fixture__/settings";

describe("Account Action", () => {

  let accountRestService: AccountRestServiceFixture;
  let accountDeviceStore: AccountDeviceStoreFixture;
  const credential: Credential = {
    region: Region.OTHER,
    username: "testUsername",
    password: "testPassword"
  };
  const dispatch = jest.fn();
  const filledAccount: Account = createAccountFixture();

  const store = configureStore<RootState, ThunkDispatch<RootState, void, AccountAction>>([thunk])();

  beforeEach(() => {
    accountRestService = createAccountRestServiceFixture();
    accountDeviceStore = createAccountDeviceStoreFixture();
    dispatch.mockReset();
    store.clearActions();
  });

  describe("createAccountUpdateAction", () => {

    const updatedAccount: AccountUpdate = {
      person: {
        firstName: "Changed"
      },
      contact: {},
      credential: {}
    };
    const filledAccount: Account = createAccountFixture();
    const account: Account = {
      ...filledAccount,
      person: {
        ...filledAccount.person,
        ...updatedAccount.person
      },
      contact: {
        ...filledAccount.contact,
        ...updatedAccount.contact
      },
      credential: {
        ...filledAccount.credential,
        ...updatedAccount.credential
      }
    };

    it("updates and loads account and creates account update action", async () => {

      accountRestService.loadAccount.mockReturnValue(account);
      const actionsExpected: Array<AccountAction> = [
        createAccountUpdatePendingAction(),
        createCommonAccountUpdateAction(account),
        createShowLaunchpadToastAction(changesSavedMessageId, launchpadToastDefaultDismissId, LaunchpadToastType.info)
      ];

      await store.dispatch(createAccountUpdateAction(updatedAccount, credential, accountRestService, accountDeviceStore));

      expect(accountRestService.updateAccount).toHaveBeenCalledWith(credential, updatedAccount);
      const actions: Array<AccountUpdateAction> = store.getActions();
      expect(actions).toEqual(actionsExpected);
    });

    it("dispatches error action in case updating account fails in platform", async () => {

      const launchPadErrorExpected = new LaunchPadError("Rest Error", ErrorType.accountRestService);
      accountRestService.updateAccount.mockRejectedValue(launchPadErrorExpected);
      const actionExpected: UpdateAccountErrorAction = {
        type: accountUpdateActionErrorType,
        error: launchPadErrorExpected,
        updatedAccount
      };

      await createAccountUpdateAction(updatedAccount, credential, accountRestService, accountDeviceStore)(dispatch, jest.fn(), undefined);
      expect(dispatch).toHaveBeenCalledWith(createAccountUpdatePendingAction());
      expect(dispatch).toHaveBeenCalledWith(actionExpected);
      expect(dispatch).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(launchPadErrorExpected));
    });

  });

  describe("createReloadAccountAction", () => {

    it("reloads account", async () => {

      accountRestService.loadAccount.mockReturnValue(filledAccount);

      await createReloadAccountAction(credential, accountRestService, accountDeviceStore)(dispatch, jest.fn(), undefined);

      expect(accountDeviceStore.saveAccount).toHaveBeenCalledWith(filledAccount);
      expect(dispatch).toHaveBeenCalledWith(createCommonAccountUpdateAction(filledAccount));
    });

    it("dispatches error action in case loading of account fails", async () => {

      const launchPadErrorExpected = new LaunchPadError("Rest Error", ErrorType.accountRestService);
      accountRestService.loadAccount.mockRejectedValue(launchPadErrorExpected);
      const updatedAccountExpected: AccountUpdate = {
        person: {},
        contact: {},
        credential: {
          username: credential.username
        }
      };
      const actionExpected: UpdateAccountErrorAction = {
        type: accountUpdateActionErrorType,
        error: launchPadErrorExpected,
        updatedAccount: updatedAccountExpected
      };


      await createReloadAccountAction(credential, accountRestService, accountDeviceStore)(dispatch, jest.fn(), undefined);

      expect(accountRestService.loadAccount).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(actionExpected);
      expect(dispatch).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(launchPadErrorExpected));
    });

    it("dispatches error action in case storing of account fails", async () => {

      accountRestService.loadAccount.mockReturnValue(filledAccount);

      const launchPadErrorExpected = new LaunchPadError("Store Error", ErrorType.accountDeviceStore);
      accountDeviceStore.saveAccount.mockRejectedValue(launchPadErrorExpected);
      const updatedAccountExpected: AccountUpdate = {
        person: {},
        contact: {},
        credential: {
          username: credential.username
        }
      };
      const actionExpected: UpdateAccountErrorAction = {
        type: accountUpdateActionErrorType,
        error: launchPadErrorExpected,
        updatedAccount: updatedAccountExpected
      };


      await createReloadAccountAction(credential, accountRestService, accountDeviceStore)(dispatch, jest.fn(), undefined);

      expect(dispatch).toHaveBeenCalledWith(actionExpected);
      expect(dispatch).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(launchPadErrorExpected));
    });

  });

  describe("createPasswordUpdateAction", () => {

    const currentPassword = credential.password;
    const newPassword = "password";
    const accountUpdate: AccountUpdate = {
      person: {},
      contact: {},
      credential: {
        username: credential.username,
        password: newPassword
      }
    };

    it("updates account with new password", async () => {

      accountRestService.loadAccount.mockReturnValue(filledAccount);
      const actionsExpected: Array<AccountAction> = [
        createAccountUpdatePendingAction(),
        createCommonAccountUpdateAction(filledAccount),
        createShowLaunchpadToastAction(changesSavedMessageId, launchpadToastDefaultDismissId, LaunchpadToastType.info)
      ];

      await store.dispatch(createPasswordUpdateAction(currentPassword, newPassword, credential, accountRestService, accountDeviceStore));

      expect(accountRestService.updateAccount).toHaveBeenCalledWith(credential, accountUpdate);
      expect(store.getActions()).toEqual(actionsExpected);

    });

    it("dispatches error action in case provided current password does not match current password", async () => {

      accountRestService.loadAccount.mockReturnValue(filledAccount);

      await createPasswordUpdateAction("wrong", newPassword, credential, accountRestService, accountDeviceStore)(dispatch, jest.fn(), undefined);
      const errorExpected: UpdateAccountErrorAction = createAccountUpdateErrorAction(accountUpdate, new LaunchPadError(invalidPasswordErrorMessage, ErrorType.updateAccountPasswordMismatch));

      expect(accountRestService.updateAccount).not.toHaveBeenCalledWith(credential, accountUpdate);
      expect(dispatch).toHaveBeenCalledWith(errorExpected);
      expect(dispatch).toHaveBeenCalledWith(createShowLaunchpadToastAction(invalidPasswordErrorMessageId));
    });

    it("dispatches error action in case updating account fails in platform", async () => {

      const launchPadErrorExpected = new LaunchPadError("Rest Error", ErrorType.accountRestService);
      accountRestService.updateAccount.mockRejectedValue(launchPadErrorExpected);
      const actionExpected: UpdateAccountErrorAction = {
        type: accountUpdateActionErrorType,
        error: launchPadErrorExpected,
        updatedAccount: accountUpdate
      };


      await createPasswordUpdateAction(currentPassword, newPassword, credential, accountRestService, accountDeviceStore)(dispatch, jest.fn(), undefined);
      expect(dispatch).toHaveBeenCalledWith(actionExpected);
      expect(dispatch).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(launchPadErrorExpected));
    });

  });

  describe("createLogoutAction", () => {

    it("clears store, create logout action and navigates to back to settings screen", async () => {

      const expectedAction = {
        type: accountLogoutActionType
      };

      await performLogout(accountDeviceStore)(dispatch, jest.fn(), undefined);

      expect(accountDeviceStore.clear).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(expectedAction);
      expect(dispatch).toHaveBeenCalledWith(createNavigateBackAction());
    });

    it("dispatches error action in case clearing account fails in store", async () => {

      const launchPadErrorExpected = new LaunchPadError("Store Error", ErrorType.accountDeviceStore);
      accountDeviceStore.clear.mockRejectedValue(launchPadErrorExpected);
      const actionExpected: LogoutErrorAction = {
        type: accountLogoutErrorActionType,
        error: launchPadErrorExpected
      };

      await performLogout(accountDeviceStore)(dispatch, jest.fn(), undefined);
      expect(dispatch).toHaveBeenCalledWith(actionExpected);
      const errorDispatched = dispatch.mock.calls[0][0].error;
      expectLaunchPadError(errorDispatched, actionExpected.error.type);
    });

  });

});
