import { bootstrapActionType } from "../actions/bootstrap";
import { Region } from "../../_common/models/system";
import { SystemAction } from "../actions/system";
import { accountLogoutActionType } from "../../modules/settings/src/account/actions/account";
import { loginSuccessActionType } from "../../modules/login/src/Login/actions/login";
import {
  RegistrationSuccessAction,
  registrationSuccessActionType
} from "../../modules/registration/src/main/actions/registration";
import { AppStateAction, updateAppStateActionType } from "../actions/appstate";

export type SystemState = {
  isBootstrapped: boolean,
  isLoggedIn: boolean,
  region: Region,
  isAppPaused: boolean
};

export const createSystemInitState = (): SystemState => ({
  isBootstrapped: false,
  isLoggedIn: false,
  region: Region.OTHER,
  isAppPaused: false
});

export const systemReducer = (state = createSystemInitState(), action: SystemAction): SystemState => {

  switch(action.type) {
    case bootstrapActionType:
      return {
        ...state,
        isBootstrapped: true
      };
    case loginSuccessActionType:
      return {
        ...state,
        isLoggedIn: true
      };
    case accountLogoutActionType:
      return {
        ...state,
        isLoggedIn: false
      };
    case registrationSuccessActionType:
      const registrationAction = action as RegistrationSuccessAction;
      const newRegion = registrationAction.newAccount.credential.region;
      if (newRegion) {
        return {
          ...state,
          region: newRegion,
        };
      }
      return state;
    case updateAppStateActionType:
      return {
        ...state,
        isAppPaused: (action as AppStateAction).isAppPaused
      };
    default:
      return state;
  }

};
