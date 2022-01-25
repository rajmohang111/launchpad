import { RootState, createInitRootState } from "../../../../../../main/reducers/main";
import {
  getProductivitySelectMachines,
  getProductivitySelectMachinesDeviceIds,
  getProductivitySelectMachinesSearchParam
} from "../selectmachines";
import { ProductivitySelectMachinesState } from "../../reducers/selectmachines";
import { ProductivityState } from "../../../main/reducers";

describe("SelectMachinesSelectors", () => {

  const testInitState: RootState = createInitRootState();

  describe("getProductivitySelectMachines", () => {

    it("returns the productivity selectMachines state", () => {
      const selectMachines: ProductivitySelectMachinesState | undefined = getProductivitySelectMachines(testInitState);
      expect(selectMachines).toBeTruthy();
    });

    it("should fail to return productivity selectMachines state", () => {
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {} as ProductivityState
        }
      };
      delete testState.modules.productivity;
      const selectMachines: ProductivitySelectMachinesState | undefined = getProductivitySelectMachines(testState);
      expect(selectMachines).toBeFalsy();
    });

  });

  describe("getProductivitySelectMachinesDeviceIds", () => {

    it("returns the deviceIds from the productivity selectMachines state", () => {
      const deviceIds = [1234];
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {
            selectMachines: {
              deviceIds
            }
          } as ProductivityState
        }
      };
      const expecteddeviceIds: Array<number> = getProductivitySelectMachinesDeviceIds(testState);
      expect(expecteddeviceIds).toEqual(deviceIds);
    });

    it("should fail to return the deviceIds of the productivity selectMachines state", () => {
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {} as ProductivityState
        }
      };
      const deviceIds: Array<number> = getProductivitySelectMachinesDeviceIds(testState);
      expect(deviceIds).toEqual([]);
    });
  });

  describe("getProductivitySelectMachinesSearchParam", () => {
    it("returns the searchParams from the productivity selectMachines state", () => {
      const searchParam: string | null = getProductivitySelectMachinesSearchParam(testInitState);
      expect(searchParam).toBeNull();
    });

    it("should fail to return the searchParams of the productivity selectMachines state", () => {
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {} as ProductivityState
        }
      };
      const searchParam: string | null = getProductivitySelectMachinesSearchParam(testState);
      expect(searchParam).toBeFalsy();
    });
  });

});
