import { NewAccount } from "../../../../../../_common/models/settings";
import {
  createRegistrationErrorAction,
  createRegistrationPendingAction,
  createRegistrationSuccessAction,
  RegistrationErrorAction,
  registrationErrorActionType,
  RegistrationPendingAction,
  registrationPendingActionType,
  RegistrationSuccessAction,
  registrationSuccessActionType
} from "../registration";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import { createNewAccountFixture } from "../../../../../../_common/models/__fixture__/settings";

describe("Registration Actions", () => {

  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  const newAccount: NewAccount = createNewAccountFixture();

  describe("createRegistrationSuccessAction", () => {

    it("creates action", () => {

      const actionExpected: RegistrationSuccessAction = {
        type: registrationSuccessActionType,
        newAccount,
      };

      const actionReturned = createRegistrationSuccessAction(newAccount);

      expect(actionReturned).toEqual(actionExpected);

    });

  });

  describe("createRegistrationPendingAction", () => {

    it("creates action", () => {

      const actionExpected: RegistrationPendingAction = {
        type: registrationPendingActionType
      };

      const actionReturned = createRegistrationPendingAction();

      expect(actionReturned).toEqual(actionExpected);

    });

  });

  describe("createRegistrationErrorAction", () => {

    it("creates action", () => {

      const launchPadError = new LaunchPadError("Test error", ErrorType.internalError);
      const actionExpected: RegistrationErrorAction = {
        type: registrationErrorActionType,
        error: launchPadError,
        newAccount
      };

      const actionReturned = createRegistrationErrorAction(launchPadError, newAccount);

      expect(actionReturned).toEqual(actionExpected);

    });

  });

});
