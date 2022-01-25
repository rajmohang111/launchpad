import { filterDeviceList } from "../selectmachines_services";
import { Device } from "../../../_common/models/device";
import { createDevices, createDevice } from "../../../__fixture__/createDeviceData";

describe("Select Machines services test", () => {

  describe("filterDeviceList", () => {

    let deviceList: Array<Device>;

    beforeEach(() => {
      deviceList = createDevices(5);
    });

    it("return whole deviceList if search param is empty", () => {
      const filteredDeviceList = filterDeviceList(deviceList);
      expect(filteredDeviceList).toEqual(deviceList);
    });

    it("return the device for a matching search param", () => {
      const filteredDeviceList = filterDeviceList(deviceList, "#4");
      expect(filteredDeviceList).toEqual([deviceList[3]]);
    });

    it("devices with empty name should not be returned", () => {
      const device = createDevice(5);
      delete device.attributes.metaData;
      deviceList.push(device);
      const filteredDeviceList = filterDeviceList(deviceList, "#4");
      expect(filteredDeviceList).toEqual([deviceList[3]]);
    });

  });

});
