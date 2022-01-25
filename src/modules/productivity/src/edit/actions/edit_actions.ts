import { Action, Dispatch } from "redux";
import { createNavigateBackAction, NavigateBackAction, createNavigateForwardAction } from "../../../../../app/actions/routing";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { SettingsAttributes } from "../../_common/models/device";
import { ModuleSelection } from "../../../../../_common/models/module";
import { createOpenSelectMachinesAction, createSaveSettingsDataFinishedAction, SaveSettingsDataFinishedAction, createReloadOverviewDataAction } from "../../_common/actions/actions";
import { ProductivityRestService } from "../../_common/services/rest";
import { createLaunchPadErrorAction, LaunchPadErrorAction } from "../../../../../app/actions/error";
import { fromModuleSelection } from "../../../../../_common/routing/routing";
import { getProductivityEditDevice, getProductivityEditSelectedDeviceIds } from "../selectors/edit";
import { getAccountCredential } from "../../../../../_common/selectors/settings";
import { createBasicHeaderData } from "../../../../../_common/rest/services/rest";
import { createShowLaunchpadToastActionFromError } from "../../../../../_common/components/launchpad_toast/actions/launchpad_toast";

export const CLOSE_EDIT_VIEW = "CLOSE_EDIT_VIEW";
export const UPDATE_DEVICE_SETTINGS = "UPDATE_DEVICE_SETTINGS";
export const SAVE_SETTINGS_DATA_STARTED = "SAVE_SETTINGS_DATA_STARTED";
export const SAVE_SETTINGS_DATA_ERROR = "SAVE_SETTINGS_DATA_ERROR";

export enum SettingsAttributeName {
  targetPerformance = "targetPerformance",
  targetSpeed = "targetSpeed",
  targetOutput = "targetOutput"
}

export type CloseEditViewAction = Action;

export interface UpdateDeviceSettingsAction extends Action {
  settingsAttributes: SettingsAttributes;
}

export type EditActions =
  CloseEditViewAction |
  UpdateDeviceSettingsAction |
  NavigateBackAction |
  Action;

export const createCloseEditViewAction = (): CloseEditViewAction => ({
  type: CLOSE_EDIT_VIEW,
});

export const createCloseEditAndNavigateBackAction = (): ThunkAction<void, RootState, void, EditActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(createCloseEditViewAction());
    dispatch(createNavigateBackAction());
  };

export const createSaveSettingsDataAction = () => ({
  type: SAVE_SETTINGS_DATA_STARTED,
});

export const createSaveEditAndNavigateBackAction = (service: ProductivityRestService): ThunkAction<void, RootState, void, EditActions> =>
  async (dispatch: Dispatch, getState): Promise<SaveSettingsDataFinishedAction | LaunchPadErrorAction> => {
    const device = getProductivityEditDevice(getState());
    const selectedDeviceIds = getProductivityEditSelectedDeviceIds(getState());
    const credential = getAccountCredential(getState());
    const auth = createBasicHeaderData(credential.username, credential.password);
    if (device) {
      dispatch(createSaveSettingsDataAction());
      const requestArray: Array<Promise<boolean>> = [];
      [device.id].concat(selectedDeviceIds).forEach(id => {
        requestArray.push(service.updateDevice(auth, id, device));
      });

      return Promise.all(requestArray)
        .then(() => {
          dispatch(createNavigateBackAction());
          dispatch(createReloadOverviewDataAction());
          return dispatch(createSaveSettingsDataFinishedAction(device));
        })
        .catch(error => {
          dispatch(createShowLaunchpadToastActionFromError(error));
          return dispatch(createLaunchPadErrorAction(SAVE_SETTINGS_DATA_ERROR, error));
        });
    }
    dispatch(createNavigateBackAction());
    return createSaveSettingsDataFinishedAction(device);
  };

export const createUpdateDeviceSettingsAction = (settingsAttributes: SettingsAttributes): UpdateDeviceSettingsAction =>
  ({
    type: UPDATE_DEVICE_SETTINGS,
    settingsAttributes
  });

export const createNavigateSelectMachinesAction = (deviceIds: Array<number>, selection: ModuleSelection): ThunkAction<void, RootState, void, EditActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(createOpenSelectMachinesAction(deviceIds));
    dispatch(createNavigateForwardAction(fromModuleSelection(selection)));
  };
