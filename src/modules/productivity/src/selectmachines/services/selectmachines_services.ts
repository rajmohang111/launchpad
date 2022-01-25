import { Device } from "../../_common/models/device";

export const filterDeviceList = (deviceList: Array<Device>, searchParam?: string) =>
  searchParam ? deviceList.filter((device: Device) =>
    device.attributes.metaData ? device.attributes.metaData.name.toUpperCase().includes(searchParam.toUpperCase()) : false) : deviceList;
