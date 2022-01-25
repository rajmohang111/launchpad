import { AccountUpdate } from "../models/account";
import { LaunchPadError } from "../../../../../_common/error/error";
import { LaunchPadErrorAction } from "../../../../../_common/actions/error";
import { Action } from "redux";
import { AccountUpdateAction } from "../../../../../_common/actions/settings";
import {Region} from "../../../../../_common/models/system";

export const accountLogoutActionType = "ACTION_LOGOUT";
export const accountLogoutErrorActionType = "ACTION_LOGOUT_ERROR";
export const accountUpdateActionErrorType = "SETTINGS_ACCOUNT_UPDATE_ERROR";
export const accountUpdatePendingActionType = "SETTINGS_ACCOUNT_UPDATE_PENDING";
export const accountRegionUpdateActionType = "SETTINGS_ACCOUNT_REGION_UPDATE";

export type UpdateAccountErrorAction = LaunchPadErrorAction & {
  updatedAccount: AccountUpdate
};
export type UpdateAccountPending = Action;
export type AccountRegionUpdateAction = Action & {
  region: Region
};

export type LogoutAction = Action;
export type LogoutErrorAction = LaunchPadErrorAction;

export type AccountAction = AccountUpdateAction |
  LogoutAction |
  UpdateAccountPending |
  UpdateAccountErrorAction;

export const createAccountRegionUpdateAction = (region: Region): AccountRegionUpdateAction => ({
  type: accountRegionUpdateActionType,
  region,
});
export const createAccountUpdateErrorAction = (updatedAccount: AccountUpdate, e: LaunchPadError): UpdateAccountErrorAction => ({
  type: accountUpdateActionErrorType,
  error: e,
  updatedAccount
});
export const createAccountUpdatePendingAction = (): UpdateAccountPending => ({
  type: accountUpdatePendingActionType
});

export const createLogoutAction = (): LogoutAction => ({
  type: accountLogoutActionType
});
