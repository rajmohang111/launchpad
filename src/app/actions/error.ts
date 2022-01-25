import { Action } from "redux";
import { LaunchPadError } from "../../_common/error/error";

export interface LaunchPadErrorAction extends Action {
  error: LaunchPadError;
}

export const createLaunchPadErrorAction = (type: string, error: LaunchPadError): LaunchPadErrorAction => ({
  type,
  error
});
