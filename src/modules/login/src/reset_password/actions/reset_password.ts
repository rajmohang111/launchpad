import { Action } from "redux";
import { LaunchPadErrorAction } from "../../../../../_common/actions/error";
import { LaunchPadError } from "../../../../../_common/error/error";

export const resetPasswordPendingActionType = "RESET_PASSWORD_PENDING";
export const resetPasswordSuccessActionType = "RESET_PASSWORD_SUCCESS";
export const resetPasswordErrorActionType = "RESET_PASSWORD_ERROR";

export type ResetPasswordPending = Action;
export type ResetPasswordSuccess = Action & {
  eMail: string
};
export type ResetPasswordError = LaunchPadErrorAction & {
  eMail: string,
};

export type ResetPasswordAction =
  ResetPasswordPending |
  ResetPasswordSuccess |
  ResetPasswordError;

export const createResetPasswordPendingAction = (): ResetPasswordPending => ({
  type: resetPasswordPendingActionType
});

export const createResetPasswordSuccessAction = (eMail: string): ResetPasswordSuccess => ({
  type: resetPasswordSuccessActionType,
  eMail
});

export const createResetPasswordErrorAction = (eMail: string, error: LaunchPadError): ResetPasswordError => ({
  type: resetPasswordErrorActionType,
  eMail,
  error
});
