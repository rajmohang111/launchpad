import { Action, Dispatch } from "redux";
import {
  createNavigateBackAction,
  createNavigateForwardAction,
  NavigateBackAction,
  NavigateForwardAction
} from "../../../../../app/actions/routing";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { ModuleSelection } from "../../../../../_common/models/module";
import { createOpenEditDetailsAction } from "../../_common/actions/actions";
import { fromModuleSelection } from "../../../../../_common/routing/routing";
import { getProductivityDetailsData } from "../selectors";
import { createLaunchPadErrorAction, LaunchPadErrorAction } from "../../../../../_common/actions/error";
import { ProductivityRestService } from "../../_common/services/rest";
import { Device } from "../../_common/models/device";
import { ErrorType, LaunchPadError } from "../../../../../_common/error/error";
import { MeasurementGroup, MeasurementGroups } from "../../_common/models/measurements";
import { createBasicHeaderData } from "../../../../../_common/rest/services/rest";
import { getAccountCredential } from "../../../../../_common/selectors/settings";
import * as moment from "moment";
import { createShowLaunchpadToastActionFromError } from "../../../../../_common/components/launchpad_toast/actions/launchpad_toast";
import { DEVICE_ORIENTATION } from "../../../../../_common/models/device_orientation";

export const CLOSE_DETAILS_VIEW = "CLOSE_DETAILS_VIEW";
export const TOGGLE_DETAILS_SWITCH = "TOGGLE_DETAILS_SWITCH";
export const FETCH_DEVICE_MEASUREMENTS = "FETCH_DEVICE_MEASUREMENTS";
export const FETCH_DEVICE_MEASUREMENTS_SUCCESS = "FETCH_DEVICE_MEASUREMENTS_SUCCESS";
export const FETCH_DEVICE_MEASUREMENTS_ERROR = "FETCH_DEVICE_MEASUREMENTS_ERROR";
export const UPDATE_DEVICE_ORIENTATION = "UPDATE_DEVICE_ORIENTATION";

export type CloseDetailsViewAction = Action;

export interface ToggleDetailsSwitchAction extends Action {
  displayMetersPerHour: boolean;
}

export type FetchDeviceMeasurementsAction = Action;

export interface FetchDeviceMeasurementsSuccessAction extends Action {
  measurements: ReadonlyArray<MeasurementGroup>;
}

export interface FetchDeviceMeasurementsErrorAction extends Action {
  error: LaunchPadError;
}

export interface UpdateDeviceOrientationAction extends Action {
  orientation: DEVICE_ORIENTATION;
}

export type DetailsActions =
  CloseDetailsViewAction |
  NavigateBackAction |
  NavigateForwardAction |
  FetchDeviceMeasurementsAction |
  FetchDeviceMeasurementsSuccessAction |
  FetchDeviceMeasurementsErrorAction |
  LaunchPadErrorAction |
  UpdateDeviceOrientationAction |
  Action;

export const createCloseDetailsViewAction = () => ({
  type: CLOSE_DETAILS_VIEW,
});

export const createToggleDetailsSwitchActionNoThunk = (displayMetersPerHour: boolean): ToggleDetailsSwitchAction => ({
  type: TOGGLE_DETAILS_SWITCH,
  displayMetersPerHour,
});

export const createCloseDetailsAndNavigateBackAction = (): ThunkAction<void, RootState, void, DetailsActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(createCloseDetailsViewAction());
    dispatch(createNavigateBackAction());
  };

export const createNavigateEditAction = (selection: ModuleSelection): ThunkAction<void, RootState, void, DetailsActions> =>
  async (dispatch: Dispatch, getState): Promise<void> => {
    dispatch(createOpenEditDetailsAction(getProductivityDetailsData(getState())));
    dispatch(createNavigateForwardAction(fromModuleSelection(selection)));
  };

export const createToggleDetailsSwitchAction = (displayMetersPerHour: boolean): ThunkAction<void, RootState, void, DetailsActions> =>
  (dispatch: Dispatch): ToggleDetailsSwitchAction => {
    return dispatch(createToggleDetailsSwitchActionNoThunk(displayMetersPerHour));
  };

export const createFetchDeviceMeasurementsAction = (): FetchDeviceMeasurementsAction => ({
  type: FETCH_DEVICE_MEASUREMENTS,
});

export const createFetchDeviceMeasurementsSuccessAction = (measurements: ReadonlyArray<MeasurementGroup>): FetchDeviceMeasurementsSuccessAction => ({
  type: FETCH_DEVICE_MEASUREMENTS_SUCCESS,
  measurements,
});

export const createUpdateDeviceOrientationAction = (orientation: DEVICE_ORIENTATION): UpdateDeviceOrientationAction => ({
  type: UPDATE_DEVICE_ORIENTATION,
  orientation,
});

export const createShouldFetchDeviceMeasurementsAction = (device: Device, service: ProductivityRestService): ThunkAction<void, RootState, void, DetailsActions> =>
  async (dispatch, getState: () => RootState): Promise<DetailsActions> => {
    if (service && service !== null) {
      dispatch(createFetchDeviceMeasurementsAction());
      const credential = getAccountCredential(getState());
      const auth = createBasicHeaderData(credential.username, credential.password);
      return service.loadDeviceMeasurements({
        auth,
        deviceId: device.id,
        start: moment().subtract(1, "day"),
        end: moment(),
      })
      .then((groups: MeasurementGroups) =>
        dispatch(createFetchDeviceMeasurementsSuccessAction(groups.data))
      )
      .catch((error) => {
        const launchPadError = new LaunchPadError(error.message, ErrorType.productivityCall);
        dispatch(createShowLaunchpadToastActionFromError(launchPadError));
        return dispatch(createLaunchPadErrorAction(FETCH_DEVICE_MEASUREMENTS_ERROR, launchPadError));
      });
    }
    const launchPadError = new LaunchPadError("Service Not Available", ErrorType.productivityCall);
    dispatch(createShowLaunchpadToastActionFromError(launchPadError));
    return Promise.resolve(dispatch(createLaunchPadErrorAction(FETCH_DEVICE_MEASUREMENTS_ERROR, launchPadError)));
  };
