import registrationReducer, { createRegistrationInitState, RegistrationState } from "../registration";
import {
  createRegistrationErrorAction,
  createRegistrationPendingAction,
  createRegistrationSuccessAction
} from "../../actions/registration";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import { Account } from "../../../../../../_common/models/settings";
import { createAccountFixture } from "../../../../../../_common/models/__fixture__/settings";

const state: RegistrationState = createRegistrationInitState();
const account: Account = createAccountFixture();

describe("Registration Reducer", () => {


  describe("registrationPendingActionType", () => {

    it("sets request pending state to true", () => {

      const stateExpected: RegistrationState = {
        ...state,
        metadata: {
          ...state.metadata,
          requestPending: true
        }
      };

      const stateReturned = registrationReducer(state, createRegistrationPendingAction());

      expect(stateReturned).toEqual(stateExpected);

    });

  });

  describe("registrationErrorActionType", () => {

    it("sets request pending state to false", () => {

      const stateWithPendingRequest: RegistrationState = {
        ...state,
        metadata: {
          ...state.metadata,
          requestPending: true
        }
      };

      const stateReturned = registrationReducer(stateWithPendingRequest, createRegistrationErrorAction(new LaunchPadError("test", ErrorType.internalError), account));

      expect(stateReturned).toEqual(state);

    });

  });

  describe("registrationSuccessActionType", () => {

    it("sets request pending state to false", () => {

      const stateWithPendingRequest: RegistrationState = {
        ...state,
        metadata: {
          ...state.metadata,
          requestPending: true
        }
      };

      const stateReturned = registrationReducer(stateWithPendingRequest, createRegistrationSuccessAction(account));

      expect(stateReturned).toEqual(state);

    });

  });

});
