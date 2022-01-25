import {
  createProductivityDetailsInitState,
  detailsReducer,
  ProductivityDetailsState
} from "../details";
import {Device} from "../../../_common/models/device";
import {createDevice, createMeasurementGroup} from "../../../__fixture__/createDeviceData";
import {
  createOpenDeviceDetailsAction,
  createSaveSettingsDataFinishedAction
} from "../../../_common/actions/actions";
import {
  createCloseDetailsViewAction,
  createFetchDeviceMeasurementsAction,
  createFetchDeviceMeasurementsSuccessAction,
  createToggleDetailsSwitchActionNoThunk,
  FETCH_DEVICE_MEASUREMENTS_ERROR
} from "../../actions/details_actions";
import {createLaunchPadErrorAction} from "../../../../../../_common/actions/error";
import {ErrorType, LaunchPadError} from "../../../../../../_common/error/error";
import { createDeviceFixture } from "../../../_common/models/__fixtures__/device";
import { MeasurementGroup } from "modules/productivity/src/_common/models/measurements";

describe("ProductivityDetailsReducer", () => {

  it("creates the initial state without errors", () => {
    const initState: ProductivityDetailsState = createProductivityDetailsInitState();
    expect(initState).toBeTruthy();
  });

  describe("isRunning", () => {
    it("should set it to true", () => {
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        isRunning: true,
      };
      expect(detailsReducer(
        createProductivityDetailsInitState(),
        createFetchDeviceMeasurementsAction()
      )).toEqual(expectedState);
    });

    it("should set it to false on success action", () => {
      const initialState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        isRunning: true,
      };
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        isRunning: false,
        shouldLoadMeasurements: false,
      };
      expect(detailsReducer(
        initialState,
        createFetchDeviceMeasurementsSuccessAction([])
      )).toEqual(expectedState);
    });

    it("should set it to false on error action", () => {
      const error = new LaunchPadError("Error for testing purposes", ErrorType.internalError);
      const initialState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        isRunning: true,
      };
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        isRunning: false,
        error,
      };
      expect(detailsReducer(
        initialState,
        createLaunchPadErrorAction(FETCH_DEVICE_MEASUREMENTS_ERROR, error)
      )).toEqual(expectedState);
    });
  });

  describe("shouldLoadMeasurements", () => {
    it("should set it to false", () => {
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        shouldLoadMeasurements: false,
      };
      expect(detailsReducer(
        createProductivityDetailsInitState(),
        createFetchDeviceMeasurementsSuccessAction([]),
      )).toEqual(expectedState);
    });

    it("should set it to true on leaving the details view", () => {
      const initialState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        shouldLoadMeasurements: false,
      };
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        shouldLoadMeasurements: true,
      };
      expect(detailsReducer(
        initialState,
        createCloseDetailsViewAction(),
      )).toEqual(expectedState);
    });

    it("should set it to true on opening details view", () => {
      const device = createDeviceFixture();
      const initialState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        shouldLoadMeasurements: false,
      };
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        data: device,
        shouldLoadMeasurements: true,
      };
      expect(detailsReducer(
        initialState,
        createOpenDeviceDetailsAction(device),
      )).toEqual(expectedState);
    });

  });

  describe("data", () => {

    const data: Device = createDevice(1);

    it("should load the data on opening detail", () => {
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        data,
      };
      expect<ProductivityDetailsState>(detailsReducer(
        createProductivityDetailsInitState(),
        createOpenDeviceDetailsAction(data)
      )).toEqual(expectedState);
    });

    it("should clear the data once details is closed", () => {
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        data: null,
      };
      expect<ProductivityDetailsState>(detailsReducer(
        createProductivityDetailsInitState(),
        createCloseDetailsViewAction()
      )).toEqual(expectedState);
    });

    it("should update device once settings are saved", () => {
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        data,
      };
      expect<ProductivityDetailsState>(detailsReducer(
        createProductivityDetailsInitState(),
        createSaveSettingsDataFinishedAction(data)
      )).toEqual(expectedState);
    });

  });

  describe("error", () => {

    it("should clear the error once details are closed", () => {
      const expectedState: ProductivityDetailsState = createProductivityDetailsInitState();
      expect<ProductivityDetailsState>(detailsReducer(
        {
          ...createProductivityDetailsInitState(),
          error: new Error()
        },
        createCloseDetailsViewAction()
      )).toEqual(expectedState);
    });

  });

  describe("displayMetersPerHour", () => {

    it("should toggle displayMetersPerHour from false to true", () => {
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        displayMetersPerHour: true,
      };
      expect<ProductivityDetailsState>(detailsReducer(
        createProductivityDetailsInitState(),
        createToggleDetailsSwitchActionNoThunk(true),
      )).toEqual(expectedState);
    });

    it("should toggle displayMetersPerHour from true to false", () => {
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        displayMetersPerHour: false,
      };
      expect<ProductivityDetailsState>(detailsReducer(
        {
          ...createProductivityDetailsInitState(),
          displayMetersPerHour: true,
        },
        createToggleDetailsSwitchActionNoThunk(false),
      )).toEqual(expectedState);
    });

  });

  describe("measurementGroups", () => {

    it("should set the measurements", () => {
      const measurementGroups: ReadonlyArray<MeasurementGroup> =  [createMeasurementGroup()];
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        measurementGroups,
        shouldLoadMeasurements: false
      };
      expect<ProductivityDetailsState>(detailsReducer(
        createProductivityDetailsInitState(),
        createFetchDeviceMeasurementsSuccessAction(measurementGroups),
      )).toEqual(expectedState);
    });

    it("should clear measurements after closing details view", () => {
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState()
      };
      expect<ProductivityDetailsState>(detailsReducer(
        createProductivityDetailsInitState(),
        createCloseDetailsViewAction(),
      )).toEqual(expectedState);
    });

    it("should clear measurements before opening details view", () => {
      const device = createDeviceFixture();
      const expectedState: ProductivityDetailsState = {
        ...createProductivityDetailsInitState(),
        data: device
      };
      expect<ProductivityDetailsState>(detailsReducer(
        createProductivityDetailsInitState(),
        createOpenDeviceDetailsAction(device),
      )).toEqual(expectedState);
    });

  });

});
