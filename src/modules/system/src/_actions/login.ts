import {Action, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {Region} from "../../../../_common/models/system";
import {LaunchPadErrorAction} from "../../../../app/actions/error";
import {RootState} from "../../../../main/reducers/main";
import {LaunchPadError} from "../../../../_common/error/error";
import {SharedAccountDeviceStore} from "../../../../_common/stores/settings";
import {getAccount} from "../../../../_common/selectors/settings";

export const updateLoginRegionSuccessActionType = "UPDATE_LOGIN_REGION_SUCCESS";
export const updateLoginRegionErrorActionType = "UPDATE_LOGIN_REGION_ERROR";

export type UpdateLoginRegionSuccessAction = Action & {
  region: Region
};

export type UpdateLoginRegionErrorAction = LaunchPadErrorAction & {
  region: Region
};

export type LoginRegionActions =
  UpdateLoginRegionSuccessAction |
  UpdateLoginRegionErrorAction |
  Action;

export function createUpdateLoginRegionSuccessAction(region: Region): UpdateLoginRegionSuccessAction {
  return {
    type: updateLoginRegionSuccessActionType,
    region,
  };
}

export function createUpdateLoginRegionErrorAction(e: LaunchPadError, region: Region): UpdateLoginRegionErrorAction {
  return {
    type: updateLoginRegionErrorActionType,
    error: e,
    region,
  };
}

export function createUpdateLoginRegionAction(region: Region, accountDeviceStore: SharedAccountDeviceStore): ThunkAction<void, RootState, void, LoginRegionActions> {
  return async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
    try {
      const account = getAccount(getState());
      account.credential.region = region;
      await accountDeviceStore.saveAccount(account);
      dispatch(createUpdateLoginRegionSuccessAction(region));
    } catch (e) {
      dispatch(createUpdateLoginRegionErrorAction(e, region));
    }
  };
}
