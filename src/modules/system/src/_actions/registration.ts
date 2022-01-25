import {Action, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {Region} from "../../../../_common/models/system";
import {LaunchPadErrorAction} from "../../../../app/actions/error";
import {RootState} from "../../../../main/reducers/main";
import {LaunchPadError} from "../../../../_common/error/error";
import { SharedAccountDeviceStore } from "../../../../_common/stores/settings";
import { getAccount } from "../../../../_common/selectors/settings";

export const updateRegistrationRegionSuccessActionType = "UPDATE_REGISTRATION_REGION_SUCCESS";
export const updateRegistrationRegionErrorActionType = "UPDATE_REGISTRATION_REGION_ERROR";

export type UpdateRegistrationRegionSuccessAction = Action & {
  region: Region
};

export type UpdateRegistrationRegionErrorAction = LaunchPadErrorAction & {
  region: Region
};

export type RegistrationRegionActions =
  UpdateRegistrationRegionSuccessAction |
  UpdateRegistrationRegionErrorAction |
  Action;

export function createUpdateRegistrationRegionSuccessAction(region: Region): UpdateRegistrationRegionSuccessAction {
  return {
    type: updateRegistrationRegionSuccessActionType,
    region,
  };
}

export function createUpdateRegistrationRegionErrorAction(e: LaunchPadError, region: Region): UpdateRegistrationRegionErrorAction {
  return {
    type: updateRegistrationRegionErrorActionType,
    error: e,
    region,
  };
}

export function createUpdateRegistrationRegionAction(region: Region, accountDeviceStore: SharedAccountDeviceStore): ThunkAction<void, RootState, void, RegistrationRegionActions> {
  return async (dispatch: Dispatch, getState: () => RootState): Promise<void> => {
    try {
      const account = getAccount(getState());
      account.credential.region = region;
      await accountDeviceStore.saveAccount(account);
      dispatch(createUpdateRegistrationRegionSuccessAction(region));
    } catch (e) {
      dispatch(createUpdateRegistrationRegionErrorAction(e, region));
    }
  };
}
