import { Action } from "redux";
import { Device } from "../models/device";

export const OPEN_DEVICE_DETAILS = "OPEN_DEVICE_DETAILS";
export const OPEN_EDIT_DETAILS = "OPEN_EDIT_DETAILS";
export const OPEN_SELECT_MACHINES = "OPEN_SELECT_MACHINES";
export const SAVE_SELECTED_MACHINES = "SAVE_SELECTED_MACHINES";
export const CLOSE_SELECT_MACHINES_VIEW = "CLOSE_SELECT_MACHINES_VIEW";
export const SAVE_SETTINGS_DATA_FINISHED = "SAVE_SETTINGS_DATA_FINISHED";
export const RELOAD_OVERVIEW_DATA = "RELOAD_OVERVIEW_DATA";
export const SWITCH_DATA_DISPLAY = "SWITCH_DATA_DISPLAY";

export interface OpenDeviceDetailsAction extends Action {
  device: Device;
}

export interface OpenEditDetailsAction extends Action {
  device: Device | null;
}

export interface SaveSelectedMachinesAction extends Action {
  deviceIds: Array<number>;
}

export interface OpenSelectMachinesAction extends Action {
  deviceIds: Array<number>;
}

export type CloseSelectMachinesViewAction = Action;

export interface SaveSettingsDataFinishedAction extends Action {
  device: Device | null;
}

export interface OverviewSwitchDataDisplayAction extends Action {
  displayMetersPerHour: boolean;
}

export const createOpenDeviceDetailsAction = (device: Device): OpenDeviceDetailsAction => ({
  type: OPEN_DEVICE_DETAILS,
  device,
});

export const createOpenEditDetailsAction = (device: Device | null): OpenEditDetailsAction => ({
  type: OPEN_EDIT_DETAILS,
  device,
});

export const createOpenSelectMachinesAction = (deviceIds: Array<number>): OpenSelectMachinesAction => ({
  type: OPEN_SELECT_MACHINES,
  deviceIds
});

export const createSaveSelectMachineViewAction = (deviceIds: Array<number>): SaveSelectedMachinesAction => ({
  type: SAVE_SELECTED_MACHINES,
  deviceIds
});

export const createCloseSelectMachineViewAction = (): CloseSelectMachinesViewAction => ({
  type: CLOSE_SELECT_MACHINES_VIEW,
});

export const createSaveSettingsDataFinishedAction = (device: Device| null): SaveSettingsDataFinishedAction => ({
  type: SAVE_SETTINGS_DATA_FINISHED,
  device
});

export const createReloadOverviewDataAction = () => ({
  type: RELOAD_OVERVIEW_DATA
});

export const createOverviewSwitchDataDisplayAction = (displayMetersPerHour: boolean): OverviewSwitchDataDisplayAction => ({
  type: SWITCH_DATA_DISPLAY,
  displayMetersPerHour,
});

