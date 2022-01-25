import { combineReducers } from "redux";
import { EditActions, CLOSE_EDIT_VIEW, UpdateDeviceSettingsAction, UPDATE_DEVICE_SETTINGS, } from "../actions/edit_actions";
import { Device } from "../../_common/models/device";
import {
  CLOSE_SELECT_MACHINES_VIEW,
  OPEN_EDIT_DETAILS,
  OpenEditDetailsAction,
  SAVE_SELECTED_MACHINES,
  SaveSelectedMachinesAction,
  SAVE_SETTINGS_DATA_FINISHED
} from "../../_common/actions/actions";
import {
  SAVE_SETTINGS_DATA_ERROR,
  SAVE_SETTINGS_DATA_STARTED,
} from "../actions/edit_actions";
import { LaunchPadErrorAction } from "../../../../../app/actions/error";

export type ProductivityEditState = {
  device: Device | null;
  error: Error | null;
  selectedDeviceIds: Array<number>;
  loading: boolean;
};

export const createProductivityEditInitState = (): ProductivityEditState => ({
  device: null,
  error: null,
  selectedDeviceIds: [],
  loading: false
});

const initState: ProductivityEditState = createProductivityEditInitState();

const device = (state: Device | null = initState.device, action: EditActions): Device | null => {
  switch (action.type) {
    case OPEN_EDIT_DETAILS: {
      const device = (action as OpenEditDetailsAction).device;
      return device ? { ...device } : null;
    }
    case UPDATE_DEVICE_SETTINGS: {
      const udsAction = action as UpdateDeviceSettingsAction;
      const updateState = { ...state } as Device;
      return {
        ...updateState,
        attributes: {
          ...updateState.attributes,
          settings: {
            ...updateState.attributes.settings,
            ...udsAction.settingsAttributes
          }
        }
      } as Device;
    }
    case CLOSE_EDIT_VIEW: {
      return null;
    }
    case SAVE_SETTINGS_DATA_FINISHED: {
      return null;
    }
    default: {
      return state;
    }
  }
};

const error = (state: Error | null = initState.error, action: EditActions): Error | null => {
  switch (action.type) {
    case CLOSE_EDIT_VIEW: {
      return null;
    }
    case SAVE_SETTINGS_DATA_ERROR: {
      const lpeAction = action as LaunchPadErrorAction;
      return lpeAction.error;
    }
    default: {
      return state;
    }
  }
};

const selectedDeviceIds = (state: Array<number> = initState.selectedDeviceIds, action: EditActions): Array<number> => {
  switch (action.type) {
    case SAVE_SELECTED_MACHINES:
      const ssmAction = action as SaveSelectedMachinesAction;
      return [...ssmAction.deviceIds];
    case CLOSE_SELECT_MACHINES_VIEW:
      return [...state];
    case CLOSE_EDIT_VIEW: {
      return [];
    }
    case SAVE_SETTINGS_DATA_FINISHED: {
      return [];
    }
    default: {
      return state;
    }
  }
};

const loading = (state: boolean = initState.loading, action: EditActions): boolean => {
  switch (action.type) {
    case SAVE_SETTINGS_DATA_STARTED:
      return true;
    case SAVE_SETTINGS_DATA_FINISHED:
      return false;
    case SAVE_SETTINGS_DATA_ERROR:
      return false;
    default: {
      return state;
    }
  }
};

export const editReducer = combineReducers<ProductivityEditState>({
  device,
  error,
  selectedDeviceIds,
  loading
});
export default editReducer;
