import { Account } from "../../../../../../_common/models/settings";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import {
  accountLogoutActionType,
  accountUpdateActionErrorType, accountUpdatePendingActionType,
  createAccountUpdateErrorAction, createAccountUpdatePendingAction, createLogoutAction,
  LogoutAction,
  UpdateAccountErrorAction, UpdateAccountPending
} from "../account";
import { createAccountFixture } from "../../../../../../_common/models/__fixture__/settings";

describe("Account Actions", () => {

  const account: Account = createAccountFixture();
  describe("createAccountUpdateErrorAction", () => {


    it("creates action", () => {

      const error: LaunchPadError = new LaunchPadError("Rest Error", ErrorType.internalError);
      const updateAccountErrorActionExpected: UpdateAccountErrorAction = {
        type: accountUpdateActionErrorType,
        error,
        updatedAccount: account
      };

      const errorActionReturned = createAccountUpdateErrorAction(account, error);

      expect(errorActionReturned).toEqual(updateAccountErrorActionExpected);

    });

  });

  describe("createLogoutAction", () => {

    it("creates action", () => {

      const actionExpected: LogoutAction = {
        type: accountLogoutActionType
      };

      expect(createLogoutAction()).toEqual(actionExpected);

    });

  });

  describe("createAccountUpdatePendingAction", () => {

    it("creates action", () => {

      const actionExpected: UpdateAccountPending = {
        type: accountUpdatePendingActionType
      };

      expect(createAccountUpdatePendingAction()).toEqual(actionExpected);

    });

  });

});
