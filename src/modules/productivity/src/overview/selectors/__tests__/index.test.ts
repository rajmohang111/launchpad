import {createInitRootState, RootState} from "../../../../../../main/reducers/main";
import {
  getProductivityOverview,
  getProductivityOverviewIsRunning,
  getProductivityOverviewLastUpdated,
  getProductivityOverviewShouldLoadDevices
} from "../index";
import {ProductivityOverviewState} from "../../reducers/overview";
import {update} from "lodash";

describe("OverviewSelectors", () => {

  let testInitState: RootState;
  beforeEach(() => {
    testInitState = createInitRootState();
  });

  describe("getProductivityOverview", () => {
    it("returns the productivity overview state", () => {
      const overview: ProductivityOverviewState | undefined = getProductivityOverview(testInitState);
      expect(overview).toBeTruthy();
    });

    it("should fail to return the productivity overview state - productivity state is undefined", () => {
      const testState: RootState = update(testInitState, "modules.productivity", () => undefined);
      const overview: ProductivityOverviewState | undefined = getProductivityOverview(testState);
      expect(overview).toBeFalsy();
    });

    it("should fail to return the productivity overview state - productivity state is empty object", () => {
      const testState: RootState = update(testInitState, "modules.productivity", () => ({}));
      const overview: ProductivityOverviewState | undefined = getProductivityOverview(testState);
      expect(overview).toBeFalsy();
    });
  });

  describe("getProductivityOverviewLastUpdated", () => {
    it("returns the lastUpdated part from the productivity overview state", () => {
      const testState: RootState = update(testInitState, "modules.productivity.overview", (overview: ProductivityOverviewState) => ({
        ...overview,
        lastUpdated: 55555555,
      }));
      const data: number = getProductivityOverviewLastUpdated(testState);
      expect(data).toBe(55555555);
    });

    it("should fail to return the lastUpdated part of the productivity overview state", () => {
      const testState: RootState = update(testInitState, "modules.productivity", () => ({}));
      const data: number = getProductivityOverviewLastUpdated(testState);
      expect(data).toBeFalsy();
    });
  });

  describe("getProductivityOverviewShouldLoadDevices", () => {
    it("returns the shouldLoadDevices part from the productivity overview state", () => {
      const testState: RootState = update(testInitState, "modules.productivity.overview", (overview: ProductivityOverviewState) => ({
        ...overview,
        shouldLoadDevices: true,
      }));
      const data: boolean = getProductivityOverviewShouldLoadDevices(testState);
      expect(data).toBeTruthy();
    });

    it("should fail to return the shouldLoadDevices part of the productivity overview state", () => {
      const testState: RootState = update(testInitState, "modules.productivity", () => ({}));
      const data: boolean = getProductivityOverviewShouldLoadDevices(testState);
      expect(data).toBeFalsy();
    });
  });

  describe("getProductivityOverviewIsRunning", () => {
    it("returns the isRunning part from the productivity overview state", () => {
      const testState: RootState = update(testInitState, "modules.productivity.overview", (overview: ProductivityOverviewState) => ({
        ...overview,
        isRunning: true,
      }));
      const data: boolean = getProductivityOverviewIsRunning(testState);
      expect(data).toBeTruthy();
    });

    it("should fail to return the isRunning part of the productivity overview state", () => {
      const testState: RootState = update(testInitState, "modules.productivity", () => ({}));
      const data: boolean = getProductivityOverviewIsRunning(testState);
      expect(data).toBeFalsy();
    });
  });

});
