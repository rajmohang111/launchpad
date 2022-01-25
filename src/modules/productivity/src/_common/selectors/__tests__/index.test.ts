import { getProductivityOverviewData, getProductivityOverviewDisplayMetersPerHour } from "../index";
import { Device } from "../../../_common/models/device";
import { RootState, createInitRootState } from "../../../../../../main/reducers/main";
import { ProductivityState } from "../../../main/reducers";
import { ProductivityOverviewState } from "../../../overview/reducers/overview";
import {update} from "lodash";

describe("Productivity Selectors", () => {

  let testInitState: RootState;

  beforeAll(() => {
    testInitState = createInitRootState();
  });

  describe("getProductivityOverviewData", () => {
    it("returns the data part from the productivity overview state", () => {
      const data: Array<Device> | undefined = getProductivityOverviewData(testInitState);
      expect(data).toBeTruthy();
    });

    it("should fail to return the data part of the productivity overview state", () => {
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {} as ProductivityState
        }
      };
      const data: Array<Device> | undefined = getProductivityOverviewData(testState);
      expect(data).toBeFalsy();
    });
  });

  describe("getProductivityOverviewDisplayMetersPerHour", () => {
    it("returns the displayMetersPerHour part from the productivity overview state", () => {
      const testState: RootState = update(testInitState, "modules.productivity.overview", (overview: ProductivityOverviewState) => ({
        ...overview,
        displayMetersPerHour: true,
      }));
      const data: boolean = getProductivityOverviewDisplayMetersPerHour(testState);
      expect(data).toBeTruthy();
    });

    it("should fail to return the displayMetersPerHour part of the productivity overview state", () => {
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {} as ProductivityState
        }
      };
      const data: boolean = getProductivityOverviewDisplayMetersPerHour(testState);
      expect(data).toBeFalsy();
    });
  });

});
