import { RootState, createInitRootState } from "../../../../../../main/reducers/main";
import { getProductivityEdit, getProductivityEditDevice, getProductivityEditSelectedDeviceIds, getProductivityEditLoading } from "../edit";
import { ProductivityEditState } from "../../reducers/edit";
import { ProductivityState } from "../../../main/reducers";
import { Device } from "../../../_common/models/device";

describe("EditSelectors", () => {

  const testInitState: RootState = createInitRootState();

  describe("getProductivityEdit", () => {
    it("returns the productivity edit state", () => {
      const edit: ProductivityEditState | undefined = getProductivityEdit(testInitState);
      expect(edit).toBeTruthy();
    });

    it("should fail to return the productivity edit state", () => {
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {} as ProductivityState
        }
      };
      delete testState.modules.productivity;
      const edit: ProductivityEditState | undefined = getProductivityEdit(testState);
      expect(edit).toBeFalsy();
    });
  });

  describe("getProductivityEditDevice", () => {
    it("returns the data part from the productivity edit state", () => {
      const data: Device | null = getProductivityEditDevice(testInitState);
      expect(data).toBeNull();
    });

    it("should fail to return the data part of the productivity edit state", () => {
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {} as ProductivityState
        }
      };
      const data: Device | null = getProductivityEditDevice(testState);
      expect(data).toBeFalsy();
    });
  });

  describe("getProductivityEditSelectedDeviceIds", () => {

    it("return the deviceIds from the productivity edit state", () => {
      const selectedDeviceIds = [123];
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {
            edit: {
              selectedDeviceIds
            }
          } as ProductivityState
        }
      };
      const deviceIds: Array<number> = getProductivityEditSelectedDeviceIds(testState);
      expect(deviceIds).toEqual(selectedDeviceIds);
    });

    it("should fail to return the deviceIds from productivity edit state", () => {
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {} as ProductivityState
        }
      };
      const data: Array<number> = getProductivityEditSelectedDeviceIds(testState);
      expect(data).toEqual([]);
    });
  });

  describe("getProductivityEditLoading", () => {

    it("return the loading status from the productivity edit state", () => {
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {
            edit: {
              loading: true
            }
          } as ProductivityState
        }
      };
      const loading: boolean = getProductivityEditLoading(testState);
      expect(loading).toBeTruthy();
    });

    it("should return false if loading status doesnt exist from productivity edit state", () => {
      const testState: RootState = {
        ...testInitState,
        modules: {
          ...testInitState.modules,
          productivity: {} as ProductivityState
        }
      };
      const loading: boolean = getProductivityEditLoading(testState);
      expect(loading).toBeFalsy();
    });

  });

});
