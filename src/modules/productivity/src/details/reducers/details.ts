import {
  CLOSE_DETAILS_VIEW,
  DetailsActions,
  FETCH_DEVICE_MEASUREMENTS,
  FETCH_DEVICE_MEASUREMENTS_ERROR,
  FETCH_DEVICE_MEASUREMENTS_SUCCESS,
  FetchDeviceMeasurementsErrorAction,
  FetchDeviceMeasurementsSuccessAction,
  TOGGLE_DETAILS_SWITCH,
  ToggleDetailsSwitchAction, UPDATE_DEVICE_ORIENTATION, UpdateDeviceOrientationAction
} from "../actions/details_actions";
import {combineReducers} from "redux";
import {Device} from "../../_common/models/device";
import {
  OPEN_DEVICE_DETAILS,
  OpenDeviceDetailsAction,
  SAVE_SETTINGS_DATA_FINISHED,
  SaveSettingsDataFinishedAction
} from "../../_common/actions/actions";
import {MeasurementGroup} from "../../_common/models/measurements";
import {DEVICE_ORIENTATION} from "../../../../../_common/models/device_orientation";

export type ProductivityDetailsState = {
  isRunning: boolean,
  shouldLoadMeasurements: boolean,
  displayMetersPerHour: boolean,
  data: Device | null,
  measurementGroups: ReadonlyArray<MeasurementGroup>,
  error: Error | null,
  orientation: DEVICE_ORIENTATION,
};

export const createProductivityDetailsInitState = (): ProductivityDetailsState => ({
  isRunning: false,
  shouldLoadMeasurements: true,
  displayMetersPerHour: false,
  data: null,
  measurementGroups: [],
  error: null,
  orientation: DEVICE_ORIENTATION.PORTRAIT,
});

const initState = createProductivityDetailsInitState();

const isRunning = (state: boolean = initState.isRunning, action: DetailsActions): boolean => {
  switch (action.type) {
    case FETCH_DEVICE_MEASUREMENTS: {
      return true;
    }
    case FETCH_DEVICE_MEASUREMENTS_SUCCESS: {
      return false;
    }
    case FETCH_DEVICE_MEASUREMENTS_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const shouldLoadMeasurements = (state: boolean = initState.shouldLoadMeasurements, action: DetailsActions): boolean => {
  switch (action.type) {
    case FETCH_DEVICE_MEASUREMENTS_SUCCESS: {
      return false;
    }
    case SAVE_SETTINGS_DATA_FINISHED: {
      return true;
    }
    case CLOSE_DETAILS_VIEW: {
      return true;
    }
    case OPEN_DEVICE_DETAILS: {
      return true;
    }
    default: {
      return state;
    }
  }
};

const displayMetersPerHour = (state: boolean = initState.displayMetersPerHour, action: DetailsActions): boolean => {
  switch (action.type) {
    case TOGGLE_DETAILS_SWITCH: {
      const tdsAction = action as ToggleDetailsSwitchAction;
      return tdsAction.displayMetersPerHour;
    }
    default: {
      return state;
    }
  }
};

const data = (state: Device | null = initState.data, action: DetailsActions): Device | null => {
  switch (action.type) {
    case OPEN_DEVICE_DETAILS: {
      const oddAction = action as OpenDeviceDetailsAction;
      return oddAction.device;
    }
    case CLOSE_DETAILS_VIEW: {
      return null;
    }
    case SAVE_SETTINGS_DATA_FINISHED: {
      const ssdfAction = action as SaveSettingsDataFinishedAction;
      return ssdfAction.device;
    }
    default: {
      return state;
    }
  }
};

const measurementGroups = (state: ReadonlyArray<MeasurementGroup> = initState.measurementGroups, action: DetailsActions): ReadonlyArray<MeasurementGroup> => {
  switch (action.type) {
    case FETCH_DEVICE_MEASUREMENTS_SUCCESS: {
      const fdmsAction = action as FetchDeviceMeasurementsSuccessAction;
      return fdmsAction.measurements;
    }
    case CLOSE_DETAILS_VIEW: {
      return [];
    }
    case OPEN_DEVICE_DETAILS: {
      return [];
    }
    default: {
      return state;
    }
  }
};

const error = (state: Error | null = initState.error, action: DetailsActions): Error | null => {
  switch (action.type) {
    case FETCH_DEVICE_MEASUREMENTS: {
      return null;
    }
    case FETCH_DEVICE_MEASUREMENTS_ERROR: {
      const fdmeAction = action as FetchDeviceMeasurementsErrorAction;
      return fdmeAction.error;
    }
    case CLOSE_DETAILS_VIEW: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export const orientation = (state: DEVICE_ORIENTATION = initState.orientation, action: DetailsActions) => {
  switch (action.type) {
    case UPDATE_DEVICE_ORIENTATION: {
      const udoAction = action as UpdateDeviceOrientationAction;
      return udoAction.orientation;
    }
    default: {
      return state;
    }
  }
};

export const detailsReducer = combineReducers<ProductivityDetailsState>({
  isRunning,
  shouldLoadMeasurements,
  displayMetersPerHour,
  data,
  measurementGroups,
  error,
  orientation,
});
export default detailsReducer;
