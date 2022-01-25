import {toDevices} from "../converter";
import {createDevicesResponse} from "../../../__fixture__/createDeviceData";
import {
  Analytics,
  AnalyticsPayload,
  AnalyticsRelationship,
  Device, Measurement,
  MeasurementPayload,
  MeasurementRelationship
} from "../../models/device";
import {forEach, map} from "lodash";

describe("converter", () => {

  function validateRelationship(device: Device, relationship: MeasurementRelationship | AnalyticsRelationship | undefined): void {
    expect(relationship).toBeDefined();
    if (relationship && relationship.data) {
      const attributes: Array<AnalyticsPayload | MeasurementPayload> = map(relationship.data, (data: Analytics | Measurement) => data.attributes);
      forEach(attributes, (attr: AnalyticsPayload | MeasurementPayload) => {
        expect(attr.deviceId).toBe(device.id);
      });
    } else {
      fail(new Error("data of relationship is undefined"));
    }
  }

  describe("toDevices", () => {
    it("should convert the response", () => {
      const devicesResponse = createDevicesResponse(2);
      const devices = toDevices(devicesResponse);
      expect(devices).toBeTruthy();
      expect(devices.length).toBe(2);
      devices.forEach((device: Device) => {
        expect(device.relationships).toBeTruthy();
        if (device.relationships) {
          expect(device.relationships.measurements).toBeTruthy();
          validateRelationship(device, device.relationships.measurements);
          expect(device.relationships.analytics).toBeTruthy();
          validateRelationship(device, device.relationships.analytics);
        }
        return device;
      });
    });
  });

});
