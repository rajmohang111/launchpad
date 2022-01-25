import { Action } from "redux";
import { LaunchPadErrorAction } from "./error";
import { Account } from "../models/settings";

export const accountUpdateActionType = "SETTINGS_ACCOUNT_UPDATE";
export interface AccountUpdateAction extends Action {
  updatedAccount: Account;
}

export type SharedAccountAction =
  AccountUpdateAction |
  LaunchPadErrorAction;

export const createAccountUpdateAction = (updatedAccount: Account): AccountUpdateAction => ({
  type: accountUpdateActionType,
  updatedAccount
});
