import resetPasswordReducer, { createResetPasswordInitState, ResetPasswordState } from "../reset_password";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import {
  createResetPasswordErrorAction,
  createResetPasswordPendingAction,
  createResetPasswordSuccessAction
} from "../../actions/reset_password";

describe("Reset password reducer", () => {

  const state: ResetPasswordState = createResetPasswordInitState();

  describe("ResetpasswordRequestPendingType", () => {

    describe("Init", () => {

      it("creates init state", () => {

        const stateExpected: ResetPasswordState = {
          metadata: {
            resetPasswordPending: false
          }
        };

        const stateReturned = createResetPasswordInitState();

        expect(stateReturned).toEqual(stateExpected);

      });

    });

  });

  describe("resetPasswordSuccessActionType", () => {

    it("sets reset password to pending", () => {
      const stateExpected: ResetPasswordState = {
        ...state,
        metadata: {
          ...state.metadata,
          resetPasswordPending: true
        }
      };
      const resetPasswordPendingAction = createResetPasswordPendingAction();

      const stateReturned = resetPasswordReducer(state, resetPasswordPendingAction);

      expect(stateReturned).toEqual(stateExpected);

    });

  });

  describe("resetPasswordSuccessActionType", () => {

    const eMail = "test@test.de";
    it("sets reset password to not pending", () => {
      const stateWithResetPasswordPending: ResetPasswordState = {
        ...state,
        metadata: {
          ...state.metadata,
          resetPasswordPending: true
        }
      };
      const stateExpected: ResetPasswordState = {
        ...state,
        metadata: {
          ...state.metadata,
          resetPasswordPending: false
        }
      };
      const resetPasswordPendingAction = createResetPasswordSuccessAction(eMail);

      const stateReturned = resetPasswordReducer(stateWithResetPasswordPending, resetPasswordPendingAction);

      expect(stateReturned).toEqual(stateExpected);

    });

  });

  describe("resetPasswordErrorActionType", () => {

    const email = "test@test.de";
    it("sets reset password to not pending", () => {
      const error = new LaunchPadError("Test", ErrorType.accountRestService);
      const stateWithResetPasswordPending: ResetPasswordState = {
        ...state,
        metadata: {
          ...state.metadata,
          resetPasswordPending: true
        }
      };
      const stateExpected: ResetPasswordState = {
        ...state,
        metadata: {
          ...state.metadata,
          resetPasswordPending: false
        }
      };
      const resetPasswordPendingAction = createResetPasswordErrorAction(email, error);

      const stateReturned = resetPasswordReducer(stateWithResetPasswordPending, resetPasswordPendingAction);

      expect(stateReturned).toEqual(stateExpected);

    });

  });

});
