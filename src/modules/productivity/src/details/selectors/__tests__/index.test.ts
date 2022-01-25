import {createInitRootState, RootState} from "../../../../../../main/reducers/main";
import {
  getProductivityDetails,
  getProductivityDetailsData, getProductivityDetailsDeviceOrientation,
  getProductivityDetailsDisplayMetersPerHour,
  getProductivityDetailsIsRunning,
  getProductivityDetailsMeasurementGroups,
  getProductivityDetailsShouldLoadMeasurements,
} from "../index";
import {ProductivityDetailsState} from "../../reducers/details";
import {Device} from "../../../_common/models/device";
import {update} from "lodash";
import {MeasurementGroup} from "../../../_common/models/measurements";
import {DEVICE_ORIENTATION} from "../../../../../../_common/models/device_orientation";

describe("OverviewSelectors", () => {

  let testInitState: RootState;
  beforeEach(() => {
    testInitState = createInitRootState();
  });

  describe("getProductivityDetails", () => {
    it("returns the productivity details state", () => {
      const details: ProductivityDetailsState | undefined = getProductivityDetails(testInitState);
      expect(details).toBeTruthy();
    });

    it("should fail to return the productivity details state - productivity state is undefined", () => {
      const testState: RootState = update(testInitState, "modules.productivity", () => undefined);
      const details: ProductivityDetailsState | undefined = getProductivityDetails(testState);
      expect(details).toBeFalsy();
    });

    it("should fail to return the productivity details state - productivity state is empty object", () => {
      const testState: RootState = update(testInitState, "modules.productivity", () => ({}));
      const details: ProductivityDetailsState | undefined = getProductivityDetails(testState);
      expect(details).toBeFalsy();
    });
  });

  describe("getProductivityDetailsData", () => {
    it("returns the data part from the productivity details data", () => {
      const data: Device | null = getProductivityDetailsData(testInitState);
      expect(data).toBeNull();
    });

    it("should fail to return the data part of the productivity details state - details state is empty object", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => ({}));
      const data: Device | null = getProductivityDetailsData(testState);
      expect(data).toBeFalsy();
    });

    it("should fail to return the data part of the productivity details state - details state is undefined", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => undefined);
      const data: Device | null = getProductivityDetailsData(testState);
      expect(data).toBeFalsy();
    });
  });

  describe("getProductivityDetailsDisplayMetersPerHour", () => {
    it("returns the displayMetersPerHour part from the productivity details", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", (details: ProductivityDetailsState): ProductivityDetailsState => ({
        ...details,
        displayMetersPerHour: true
      }));
      const displayMetersPerHour: boolean = getProductivityDetailsDisplayMetersPerHour(testState);
      expect(displayMetersPerHour).toBeTruthy();
    });

    it("should fail to return the displayMetersPerHour part of the productivity details state - details state is empty object", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => ({}));
      const displayMetersPerHour: boolean = getProductivityDetailsDisplayMetersPerHour(testState);
      expect(displayMetersPerHour).toBeFalsy();
    });

    it("should fail to return the displayMetersPerHour part of the productivity details state - details state is undefined", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => undefined);
      const displayMetersPerHour: boolean = getProductivityDetailsDisplayMetersPerHour(testState);
      expect(displayMetersPerHour).toBeFalsy();
    });
  });

  describe("getProductivityDetailsShouldLoadMeasurements", () => {
    it("returns the shouldLoadMeasurements part from the productivity details", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", (details: ProductivityDetailsState): ProductivityDetailsState => ({
        ...details,
        shouldLoadMeasurements: true,
      }));
      const shouldLoadMeasurements: boolean = getProductivityDetailsShouldLoadMeasurements(testState);
      expect(shouldLoadMeasurements).toBeTruthy();
    });

    it("should fail to return the shouldLoadMeasurements part of the productivity details state - details state is empty object", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => ({}));
      const shouldLoadMeasurements: boolean = getProductivityDetailsShouldLoadMeasurements(testState);
      expect(shouldLoadMeasurements).toBeFalsy();
    });

    it("should fail to return the shouldLoadMeasurements part of the productivity details state - details state is undefined", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => undefined);
      const shouldLoadMeasurements: boolean = getProductivityDetailsShouldLoadMeasurements(testState);
      expect(shouldLoadMeasurements).toBeFalsy();
    });
  });

  describe("getProductivityDetailsIsRunning", () => {
    it("returns the isRunning part from the productivity details", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", (details: ProductivityDetailsState): ProductivityDetailsState => ({
        ...details,
        isRunning: true,
      }));
      const isRunning: boolean = getProductivityDetailsIsRunning(testState);
      expect(isRunning).toBeTruthy();
    });

    it("should fail to return the isRunning part of the productivity details state - details state is empty object", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => ({}));
      const isRunning: boolean = getProductivityDetailsIsRunning(testState);
      expect(isRunning).toBeFalsy();
    });

    it("should fail to return the isRunning part of the productivity details state - details state is undefined", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => undefined);
      const isRunning: boolean = getProductivityDetailsIsRunning(testState);
      expect(isRunning).toBeFalsy();
    });
  });

  describe("getProductivityDetailsMeasurementGroups", () => {
    it("returns the measurementGroups part from the productivity details", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", (details: ProductivityDetailsState): ProductivityDetailsState => ({
        ...details,
        measurementGroups: [],
      }));
      const measurementGroups: ReadonlyArray<MeasurementGroup> = getProductivityDetailsMeasurementGroups(testState);
      expect(measurementGroups).toEqual([]);
    });

    it("should fail to return the measurementGroups part of the productivity details state - details state is empty object", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => ({}));
      const measurementGroups: ReadonlyArray<MeasurementGroup> = getProductivityDetailsMeasurementGroups(testState);
      expect(measurementGroups).toEqual([]);
    });

    it("should return measurementGroups part of the productivity details state - details state is undefined", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => undefined);
      const measurementGroups: ReadonlyArray<MeasurementGroup> = getProductivityDetailsMeasurementGroups(testState);
      expect(measurementGroups).toEqual([]);
    });
  });

  describe("getProductivityDetailsDeviceOrientation", () => {
    it("returns the orientation part from the productivity details", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", (details: ProductivityDetailsState): ProductivityDetailsState => ({
        ...details,
        orientation: DEVICE_ORIENTATION.LANDSCAPE,
      }));
      const orientation: DEVICE_ORIENTATION = getProductivityDetailsDeviceOrientation(testState);
      expect(orientation).toEqual(DEVICE_ORIENTATION.LANDSCAPE);
    });

    it("should fail to return the orientation part of the productivity details state - details state is empty object", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => ({}));
      const orientation: DEVICE_ORIENTATION = getProductivityDetailsDeviceOrientation(testState);
      expect(orientation).toEqual(DEVICE_ORIENTATION.PORTRAIT);
    });

    it("should return orientation part of the productivity details state - details state is undefined", () => {
      const testState: RootState = update(testInitState, "modules.productivity.details", () => undefined);
      const orientation: DEVICE_ORIENTATION = getProductivityDetailsDeviceOrientation(testState);
      expect(orientation).toEqual(DEVICE_ORIENTATION.PORTRAIT);
    });
  });

});
