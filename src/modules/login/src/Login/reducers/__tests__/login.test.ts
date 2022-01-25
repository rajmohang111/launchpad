import loginReducer, { createLoginInitState, LoginState } from "../login";
import {
  createLoginErrorAction,
  createLoginInvalidAccountAction,
  createLoginPendingAction,
  createLoginSuccessAction,
  LoginErrorAction,
  LoginInvalidAccountAction,
  LoginPendingAction,
  LoginSuccessAction
} from "../../actions/login";
import { Account, Credential } from "../../../../../../_common/models/settings";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import { createAccountFixture } from "../../../../../../_common/models/__fixture__/settings";

describe("Login reducer", () => {

  const state: LoginState = createLoginInitState();
  const account: Account = createAccountFixture();
  const credential: Credential = account.credential;
  describe("loginRequestPendingType", () => {

    describe("Init", () => {

      it("creates init state", () => {

        const stateExpected: LoginState = {
          metadata: {
            loginPending: false,
            resetPasswordPending: false
          }
        };

        const stateReturned = createLoginInitState();

        expect(stateReturned).toEqual(stateExpected);

      });

    });

    it("set state to pending", () => {

      const loginPendingAction: LoginPendingAction = createLoginPendingAction();
      const stateExpected: LoginState = {
        ...state,
        metadata: {
          ...state.metadata,
          loginPending: true
        }
      };

      const stateReturned = loginReducer(state, loginPendingAction);

      expect(stateReturned).toEqual(stateExpected);

    });

  });

  describe("loginSuccessActionType", () => {

    it("resets login pending state", () => {

      const loginSuccessAction: LoginSuccessAction = createLoginSuccessAction(credential);
      const stateWithLoginPending: LoginState = {
        ...state,
        metadata: {
          ...state.metadata,
          loginPending: true
        }
      };
      const stateExpected: LoginState = {
        ...stateWithLoginPending,
        metadata: {
          ...stateWithLoginPending.metadata,
          loginPending: false
        }
      };

      const stateReturned = loginReducer(state, loginSuccessAction);

      expect(stateReturned).toEqual(stateExpected);


    });

  });

  describe("loginSuccessErrorType", () => {

    it("resets login pending state", () => {

      const loginErrorAction: LoginErrorAction = createLoginErrorAction(new LaunchPadError("Test Error", ErrorType.internalError), credential);
      const stateWithLoginPending: LoginState = {
        ...state,
        metadata: {
          ...state.metadata,
          loginPending: true
        }
      };
      const stateExpected: LoginState = {
        ...stateWithLoginPending,
        metadata: {
          ...stateWithLoginPending.metadata,
          loginPending: false
        }
      };

      const stateReturned = loginReducer(state, loginErrorAction);

      expect(stateReturned).toEqual(stateExpected);

    });

  });

  describe("loginInvalidAccountActionType", () => {

    it("resets login pending state", () => {

      const invalidAccountAction: LoginInvalidAccountAction = createLoginInvalidAccountAction(account, ["isActive"]);
      const stateWithLoginPending: LoginState = {
        ...state,
        metadata: {
          ...state.metadata,
          loginPending: true
        }
      };
      const stateExpected: LoginState = {
        ...state,
        metadata: {
          ...state.metadata,
          loginPending: false
        }
      };

      const stateReturned = loginReducer(stateWithLoginPending, invalidAccountAction);

      expect(stateReturned).toEqual(stateExpected);

    });

  });

});
