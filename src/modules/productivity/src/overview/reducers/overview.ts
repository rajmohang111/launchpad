import { combineReducers } from "redux";
import {
  LaunchPadErrorAction,
  OverviewActions,
} from "../actions/overview_actions";
import { Device } from "../../_common/models/device";
import {
  FETCH_OVERVIEW_DATA,
  FETCH_OVERVIEW_DATA_ERROR,
  FETCH_OVERVIEW_DATA_FINISHED,
  OverviewDataFetchFinishedAction,
} from "../../main/actions/productivity_actions";
import {
  RELOAD_OVERVIEW_DATA,
  OverviewSwitchDataDisplayAction,
  SWITCH_DATA_DISPLAY
} from "../../_common/actions/actions";
import { CLOSE_DETAILS_VIEW } from "../../details/actions/details_actions";
import { accountLogoutActionType } from "../../../../settings/src/account/actions/account";

export type ProductivityOverviewState = {
  data: Array<Device>,
  error: Error | null,
  lastUpdated: number,
  isRunning: boolean,
  shouldLoadDevices: boolean,
  displayMetersPerHour: boolean,
};

export const createProductivityOverviewInitState = (): ProductivityOverviewState => ({
  data: [],
  error: null,
  lastUpdated: 0,
  isRunning: false,
  shouldLoadDevices: true,
  displayMetersPerHour: false,
});

const initState: ProductivityOverviewState = createProductivityOverviewInitState();

const data = (state: Array<Device> = initState.data, action: OverviewActions): Array<Device> => {
  switch (action.type) {
    case FETCH_OVERVIEW_DATA: {
      return state;
    }
    case FETCH_OVERVIEW_DATA_FINISHED: {
      const odfAction = action as OverviewDataFetchFinishedAction;
      return odfAction.devices;
    }
    case FETCH_OVERVIEW_DATA_ERROR: {
      return [];
    }
    default: {
      return state;
    }
  }
};

const error = (state: Error | null = initState.error, action: OverviewActions): Error | null => {
  switch (action.type) {
    case FETCH_OVERVIEW_DATA: {
      return null;
    }
    case FETCH_OVERVIEW_DATA_ERROR: {
      const lpeAction = action as LaunchPadErrorAction;
      return lpeAction.error;
    }
    default: {
      return state;
    }
  }
};

const lastUpdated = (state: number = initState.lastUpdated, action: OverviewActions): number => {
  switch (action.type) {
    case FETCH_OVERVIEW_DATA_FINISHED: {
      return Date.now();
    }
    case FETCH_OVERVIEW_DATA_ERROR: {
      return Date.now();
    }
    default: {
      return state;
    }
  }
};

const isRunning = (state: boolean = initState.isRunning, action: OverviewActions): boolean => {
  switch (action.type) {
    case FETCH_OVERVIEW_DATA: {
      return true;
    }
    case FETCH_OVERVIEW_DATA_FINISHED: {
      return false;
    }
    case FETCH_OVERVIEW_DATA_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const shouldLoadDevices = (state: boolean = initState.shouldLoadDevices, action: OverviewActions): boolean => {
  switch (action.type) {
    case FETCH_OVERVIEW_DATA_FINISHED: {
      return false;
    }
    case RELOAD_OVERVIEW_DATA: {
      return true;
    }
    case CLOSE_DETAILS_VIEW: {
      return true;
    }
    case accountLogoutActionType: {
      return true;
    }
    default: {
      return state;
    }
  }
};

const displayMetersPerHour = (state: boolean = initState.displayMetersPerHour, action: OverviewActions): boolean => {
  switch (action.type) {
    case SWITCH_DATA_DISPLAY: {
      const osddAction = action as OverviewSwitchDataDisplayAction;
      return osddAction.displayMetersPerHour;
    }
    default: {
      return state;
    }
  }
};

export const overviewReducer = combineReducers<ProductivityOverviewState>({
  data,
  error,
  lastUpdated,
  isRunning,
  shouldLoadDevices,
  displayMetersPerHour,
});
export default overviewReducer;
