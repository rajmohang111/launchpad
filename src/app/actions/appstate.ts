import { Action } from "redux";

export interface AppStateAction extends Action {
  isAppPaused: boolean;
}

export const updateAppStateActionType = "updateAppStateActionType";

export const createUpdateAppStateAction = (isAppPaused: boolean): AppStateAction => ({
  type: updateAppStateActionType,
  isAppPaused
});
