import { NewAccount } from "../../../../../_common/models/settings";
import { AccountUpdateAction } from "../../../../../_common/actions/settings";
import { Action } from "redux";
import { LaunchPadErrorAction } from "../../../../../_common/actions/error";
import { NavigateBackAction } from "../../../../../app/actions/routing";
import { LaunchPadError } from "../../../../../_common/error/error";

export const registrationSuccessActionType = "ACCOUNT_REGISTRATION_SUCCESS";
export const registrationErrorActionType = "ACCOUNT_REGISTRATION_ERROR";
export const registrationPendingActionType = "ACCOUNT_REGISTRATION_PENDING";

export type RegistrationSuccessAction = Action & {
  newAccount: NewAccount,
};

export type RegistrationPendingAction = Action;

export type RegistrationErrorAction = LaunchPadErrorAction & {
  newAccount: NewAccount,
};

export type RegistrationAction =
  RegistrationSuccessAction |
  RegistrationErrorAction |
  AccountUpdateAction |
  NavigateBackAction |
  RegistrationPendingAction;


export const createRegistrationSuccessAction = (newAccount: NewAccount):RegistrationSuccessAction => ({
  type: registrationSuccessActionType,
  newAccount
});

export const createRegistrationErrorAction = (error: LaunchPadError, newAccount: NewAccount):RegistrationErrorAction  => ({
  type: registrationErrorActionType,
  error,
  newAccount,
});

export const createRegistrationPendingAction = (): RegistrationPendingAction => ({
  type:registrationPendingActionType
});
