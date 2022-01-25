import {AccountState, createAccountStateInitState, default as accountReducer} from "../account";
import {Account, Salutation} from "../../../../../../_common/models/settings";
import {createAccountStateFixture} from "../__fixtures__/account";
import {
  AccountUpdateAction,
  accountUpdateActionType
} from "../../../../../../_common/actions/settings";
import {BootstrapAction} from "../../../../../../app/actions/bootstrap";
import {createTestBootstrapAction} from "../../../../../../app/actions/__test_data__/bootstrap";
import {
  accountLogoutActionType,
  createAccountUpdateErrorAction,
  createAccountUpdatePendingAction,
  LogoutAction
} from "../../actions/account";
import {ErrorType, LaunchPadError} from "../../../../../../_common/error/error";
import {Region} from "../../../../../../_common/models/system";
import {
  createUpdateLoginRegionErrorAction,
  createUpdateLoginRegionSuccessAction
} from "../../../../../system/src/_actions/login";
import {
  createUpdateRegistrationRegionSuccessAction,
  createUpdateRegistrationRegionErrorAction
} from "../../../../../system/src/_actions/registration";
import { createAccountFixture } from "../../../../../../_common/models/__fixture__/settings";

describe("Account Reducers", () => {

  const state: AccountState = createAccountStateInitState();
  const filledState: AccountState = createAccountStateFixture();

  describe("init", () => {

    it("create init state", () => {

      const stateExpected: AccountState = {
        metadata: {
          requestPending: false
        },
        account: {
          person: {
            firstName: "",
            lastName: "",
            salutation: Salutation.MR,
            customerNumber: ""
          },
          contact: {
            eMail: "",
            mobileNumber: ""
          },
          credential: {
            region: Region.OTHER,
            username: "",
            password: ""
          },
          metadata: {
            isEmailVerified: false,
            isActive: false
          }
        }
      };

      expect(createAccountStateInitState()).toEqual(stateExpected);
    });
  });

  describe("accountUpdateActionType", () => {

    const updatedAccount: Account = createAccountFixture();

    const updateAccountAction: AccountUpdateAction = {
      type: accountUpdateActionType,
      updatedAccount
    };

    it("updates account when state is init", () => {

      const stateExpected: AccountState = {
        ...state,
        account: {
          ...state.account,
          person: updatedAccount.person,
          contact: updatedAccount.contact,
          credential: {
            ...state.account.credential,
            ...updatedAccount.credential
          },
          metadata: updatedAccount.metadata
        }
      };

      const updatedState = accountReducer(state, updateAccountAction);
      expect(updatedState).toEqual(stateExpected);
    });

    it("update account details in case already existing", () => {

      const stateExpected: AccountState = {
        ...state,
        account: {
          ...state.account,
          person: updatedAccount.person,
          contact: updatedAccount.contact,
          credential: {
            ...state.account.credential,
            ...updatedAccount.credential
          },
          metadata: updatedAccount.metadata
        }
      };

      const updatedState = accountReducer(filledState, updateAccountAction);
      expect(updatedState).toEqual(stateExpected);
    });

    it("update pending state", () => {

      const stateWithRequestPending: AccountState = {
        ...filledState,
        metadata: {
          requestPending: true
        }
      };
      const stateExpected: AccountState = {
        ...filledState,
        metadata: {
          ...filledState.metadata,
          requestPending: false
        },
        account: {
          ...filledState.account,
          ...updatedAccount
        }
      };

      const updatedState = accountReducer(stateWithRequestPending, updateAccountAction);
      expect(updatedState).toEqual(stateExpected);
    });

  });

  describe("accountUpdatePendingActionType", () => {

    it("sets request to pending", () => {

      const stateExpected: AccountState = {
        ...state,
        metadata: {
          requestPending: true
        }
      };

      const stateReturned = accountReducer(state, createAccountUpdatePendingAction());

      expect(stateReturned).toEqual(stateExpected);

    });

  });

  describe("accountUpdateActionErrorType", () => {

    it("sets pending to false in case updating account fails", () => {

      const stateWithRequestPending: AccountState = {
        ...filledState,
        metadata: {
          requestPending: true
        }
      };
      const stateExpected = { ...filledState };

      const stateReturned = accountReducer(stateWithRequestPending,
        createAccountUpdateErrorAction(filledState.account, new LaunchPadError("test", ErrorType.internalError)));

      expect(stateReturned).toEqual(stateExpected);


    });


  });

  describe("accountLogoutActionType", () => {

    it("clears account state in case of logout", () => {

      const logoutAction: LogoutAction = {
        type: accountLogoutActionType
      };

      expect(accountReducer(filledState, logoutAction)).toEqual(state);

    });

  });

  describe("bootstrapActionType", () => {

    const bootstrapAction: BootstrapAction = createTestBootstrapAction();
    it("updates account store with bootstrap information", () => {

      const stateExpected: AccountState = {
        ...state,
        account: {
          person: bootstrapAction.deviceStore.settings.account.person,
          contact: bootstrapAction.deviceStore.settings.account.contact,
          credential: bootstrapAction.deviceStore.settings.account.credential,
          metadata: bootstrapAction.deviceStore.settings.account.metadata
        }
      };

      const stateReturned = accountReducer(state, bootstrapAction);

      expect(stateReturned).toEqual(stateExpected);

    });

  });

  describe("updateLoginRegionSuccessActionType", () => {

    it("should update the credential region", () => {
      const stateExpected: AccountState = {
        ...state,
        account: {
          ...filledState.account,
          credential: {
            ...filledState.account.credential,
            region: Region.CHINA,
          },
        }
      };
      const updateRegionAction = createUpdateLoginRegionSuccessAction(Region.CHINA);

      const updatedState = accountReducer(filledState, updateRegionAction);
      expect(updatedState).toEqual(stateExpected);
    });

    it("should ignore updateLoginREgionErrorActionType", () => {
      const error = new LaunchPadError("Error for testing purposes", ErrorType.systemStore);
      const updateRegionAction = createUpdateLoginRegionErrorAction(error, Region.CHINA);
      const updatedState = accountReducer(filledState, updateRegionAction);
      expect(updatedState).toEqual(filledState);
    });

  });

  describe("updateRegistrationRegionSuccessActionType", () => {

    it("should update the credential region", () => {
      const stateExpected: AccountState = {
        ...state,
        account: {
          ...filledState.account,
          credential: {
            ...filledState.account.credential,
            region: Region.CHINA,
          },
        }
      };
      const updateRegionAction = createUpdateRegistrationRegionSuccessAction(Region.CHINA);

      const updatedState = accountReducer(filledState, updateRegionAction);
      expect(updatedState).toEqual(stateExpected);
    });

    it("should ignore updateRegistrationRegionErrorActionType", () => {
      const error = new LaunchPadError("Error for testing purposes", ErrorType.systemStore);
      const updateRegionAction = createUpdateRegistrationRegionErrorAction(error, Region.CHINA);
      const updatedState = accountReducer(filledState, updateRegionAction);
      expect(updatedState).toEqual(filledState);
    });

  });

});
