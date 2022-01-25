import {
  createResetPasswordErrorAction,
  createResetPasswordPendingAction,
  createResetPasswordSuccessAction, ResetPasswordError, resetPasswordErrorActionType,
  ResetPasswordPending,
  resetPasswordPendingActionType,
  ResetPasswordSuccess,
  resetPasswordSuccessActionType
} from "../reset_password";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";

describe("Reset Password Action Creators", () => {

  const eMail = "test@test.de";
  describe("createResetPasswordPendingAction", () => {

    it("creates", () => {
      const resetPasswordPendingActionExpected: ResetPasswordPending = {
        type: resetPasswordPendingActionType
      };

      const resetPasswordPendingActionReturned = createResetPasswordPendingAction();

      expect(resetPasswordPendingActionReturned).toEqual(resetPasswordPendingActionExpected);
    });

  });

  describe("createResetPasswordSuccessAction", () => {

    it("creates", () => {
      const resetPasswordSuccessActionExpected: ResetPasswordSuccess = {
        type: resetPasswordSuccessActionType,
        eMail
      };

      const resetPasswordSuccessActionReturned = createResetPasswordSuccessAction(eMail);

      expect(resetPasswordSuccessActionReturned).toEqual(resetPasswordSuccessActionExpected);

    });

  });

  describe("createResetPasswordErrorAction", () => {

    it("creates", () => {
      const error = new LaunchPadError("test", ErrorType.accountRestService);
      const resetPasswordErrorActionExpected: ResetPasswordError = {
        type: resetPasswordErrorActionType,
        error,
        eMail
      };

      const resetPasswordErrorActionReturned = createResetPasswordErrorAction(eMail, error);

      expect(resetPasswordErrorActionReturned).toEqual(resetPasswordErrorActionExpected);


    });

  });

});
