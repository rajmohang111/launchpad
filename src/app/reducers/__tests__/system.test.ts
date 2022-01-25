import {createSystemInitState, systemReducer, SystemState} from "../system";
import {BootstrapAction, bootstrapActionType} from "../../actions/bootstrap";
import {createInitSettings} from "../../../modules/settings/src/_common/device_store";
import {Region} from "../../../_common/models/system";
import {createLoginSuccessAction, LoginSuccessAction} from "../../../modules/login/src/Login/actions/login";
import {Account} from "../../../_common/models/settings";
import {createLogoutAction, LogoutAction} from "../../../modules/settings/src/account/actions/account";
import {
  createRegistrationSuccessAction,
  RegistrationSuccessAction
} from "../../../modules/registration/src/main/actions/registration";
import { createAccountFixture } from "../../../_common/models/__fixture__/settings";

describe("System reducer", () => {

  const account: Account = createAccountFixture();
  const region = Region.CHINA;
  const state: SystemState = createSystemInitState();
  describe("createSystemInitState", () => {

    it("returns init state", () => {

      const stateExpected: SystemState = {
        isBootstrapped: false,
        isLoggedIn: false,
        region: Region.OTHER,
        isAppPaused: false
      };

      const stateReturned = createSystemInitState();

      expect(stateReturned).toEqual(stateExpected);

    });

  });

  describe("bootstrapActionType", () => {

    it("updates system state", () => {

      const bootstrapAction: BootstrapAction = {
        type: bootstrapActionType,
        deviceStore: {
          settings: createInitSettings()
        }
      };
      const stateExpected: SystemState = {
        ...state,
        isBootstrapped: true
      };

      const stateReturned = systemReducer(state, bootstrapAction);

      expect(stateReturned).toEqual(stateExpected);

    });

  });

  describe("loginSuccessActionType", () => {

    it("set to true when user logs in", () => {
      const loginSuccessAction: LoginSuccessAction = createLoginSuccessAction(account.credential);
      const stateExpected: SystemState = {
        ...state,
        isLoggedIn: true
      };

      expect(systemReducer(state, loginSuccessAction)).toEqual(stateExpected);

    });


  });

  describe("accountLogoutActionType", () => {

    it("sets login to false when user logs out", () => {
      const loggedInState: SystemState = {
        ...state,
        isLoggedIn: true
      };
      const logoutAction: LogoutAction = createLogoutAction();

      expect(systemReducer(loggedInState, logoutAction)).toEqual(state);


    });
  });

  describe("registrationSuccessActionType", () => {

    it("sets region on registration success", () => {
      const newAccount: Account = {
        ...account,
        credential: {
          ...account.credential,
          region,
        },
      };
      const registrationAction: RegistrationSuccessAction = createRegistrationSuccessAction(newAccount);
      const stateExpected: SystemState = {
        ...state,
        region,
      };

      expect(systemReducer(state, registrationAction)).toEqual(stateExpected);


    });

  });

});
