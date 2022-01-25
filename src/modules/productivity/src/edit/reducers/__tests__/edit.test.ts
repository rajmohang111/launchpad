import {
  createProductivityEditInitState,
  ProductivityEditState,
  editReducer
} from "../edit";
import { Device, SettingsAttributes } from "../../../_common/models/device";
import { createOpenEditDetailsAction, createSaveSelectMachineViewAction, SAVE_SETTINGS_DATA_FINISHED, createCloseSelectMachineViewAction } from "../../../_common/actions/actions";
import { createCloseEditViewAction, createUpdateDeviceSettingsAction, SettingsAttributeName, SAVE_SETTINGS_DATA_ERROR, SAVE_SETTINGS_DATA_STARTED } from "../../actions/edit_actions";
import { createDevice } from "../../../__fixture__/createDeviceData";
import { createLaunchPadErrorAction } from "../../../../../../_common/actions/error";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";

describe("ProductivityEditReducer", () => {

  describe("Init state", () => {

    it("creates the initial state without errors", () => {
      const initState: ProductivityEditState = createProductivityEditInitState();
      expect(initState).toBeTruthy();
    });

  });

  describe("device", () => {

    const device: Device = createDevice(1);

    it("should load the device", () => {
      const expectedState: ProductivityEditState = {
        ...createProductivityEditInitState(),
        device,
      };
      expect<ProductivityEditState>(editReducer(
        createProductivityEditInitState(),
        createOpenEditDetailsAction(device)
      )).toEqual(expectedState);
    });

    it("should handle null device passed from action", () => {
      const expectedState: ProductivityEditState = {
        ...createProductivityEditInitState(),
        device: null,
      };
      expect<ProductivityEditState>(editReducer(
        createProductivityEditInitState(),
        createOpenEditDetailsAction(null)
      )).toEqual(expectedState);
    });

    it("should update the device settings", () => {
      const settingsAttributes: SettingsAttributes = {
        [SettingsAttributeName.targetPerformance]: {
          unit: "percent",
          data: 91
        }
      };
      const updatedDevice: Device = {
        ...device,
        attributes: {
          ...device.attributes,
          settings: {
            ...device.attributes.settings,
            ...settingsAttributes
          }
        }
      };
      const expectedState: ProductivityEditState = {
        ...createProductivityEditInitState(),
        device: updatedDevice
      };
      expect<ProductivityEditState>(editReducer(
        {
          ...createProductivityEditInitState(),
          device
        },
        createUpdateDeviceSettingsAction(settingsAttributes)
      )).toEqual(expectedState);
    });

  });

  describe("error", () => {

    it("should remove error once closing edit", () => {
      const expectedState: ProductivityEditState = {
        ...createProductivityEditInitState(),
        error: null,
      };
      expect<ProductivityEditState>(editReducer(
        createProductivityEditInitState(),
        createCloseEditViewAction()
      )).toEqual(expectedState);
    });

    it("should save the settings data error", () => {
      const error = new LaunchPadError("Error", ErrorType.backendCallError);
      const expectedState: ProductivityEditState = {
        ...createProductivityEditInitState(),
        error,
      };
      expect<ProductivityEditState>(editReducer(
        createProductivityEditInitState(),
        createLaunchPadErrorAction(SAVE_SETTINGS_DATA_ERROR, error)
      )).toEqual(expectedState);
    });

  });

  describe("selectedDeviceIds", () => {

    const selectedDeviceIds: Array<number> = [123, 456];

    it("it should save the selected device ids", () => {
      const expectedState: ProductivityEditState = {
        ...createProductivityEditInitState(),
        selectedDeviceIds,
      };
      expect<ProductivityEditState>(editReducer(
        createProductivityEditInitState(),
        createSaveSelectMachineViewAction(selectedDeviceIds)
      )).toEqual(expectedState);
    });

    it("should return the same device ids once selection is canceled", () => {
      const expectedState: ProductivityEditState = {
        ...createProductivityEditInitState(),
        selectedDeviceIds,
      };
      expect<ProductivityEditState>(editReducer(
        {
          ...createProductivityEditInitState(),
          selectedDeviceIds
        },
        createCloseSelectMachineViewAction()
      )).toEqual(expectedState);
    });

    it("should reset the selection once edit is closed", () => {
      const expectedState: ProductivityEditState = createProductivityEditInitState();
      expect<ProductivityEditState>(editReducer(
        {
          ...createProductivityEditInitState(),
          selectedDeviceIds
        },
        createCloseEditViewAction()
      )).toEqual(expectedState);
    });

  });

  describe("loading", () => {

    it("should set the loading true", () => {
      const expectedState: ProductivityEditState = {
        ...createProductivityEditInitState(),
        loading: true,
      };
      expect<ProductivityEditState>(editReducer(
        createProductivityEditInitState(),
        {
          type: SAVE_SETTINGS_DATA_STARTED,
        }
      )).toEqual(expectedState);
    });

    it("should set the loading false", () => {
      const expectedState: ProductivityEditState = {
        ...createProductivityEditInitState(),
        loading: false,
      };
      expect<ProductivityEditState>(editReducer(
        createProductivityEditInitState(),
        {
          type: SAVE_SETTINGS_DATA_FINISHED,
        }
      )).toEqual(expectedState);
    });

  });

});
