import {cloneDeep, filter, flatten, map, reduce} from "lodash";
import {
  Analytics,
  AnalyticsRelationship,
  Device,
  DevicesResponse,
  Measurement,
  MeasurementRelationship,
  Relationships
} from "../models/device";

function extractIncludes(deviceId: number | string, includes: Array<MeasurementRelationship | AnalyticsRelationship> = []): Relationships {
  const data: Array<Measurement | Analytics> = flatten<Measurement | Analytics>(map(includes, "data"));
  const filteredByDevice = filter(data, (data: Measurement | Analytics) =>
    data.attributes && `${data.attributes.deviceId}` === `${deviceId}`
  );
  return reduce(filteredByDevice, (relationships: any, current: Measurement | Analytics) => {
    if (relationships.hasOwnProperty(current.type)) {
      relationships[current.type].data.push(current);
    } else {
      relationships[current.type] = {
        data: [current],
        links: {
          related: `/device/${deviceId}/${current.type}`
        }
      };
    }
    return relationships;
  }, {});
}

export function toDevices(res: DevicesResponse): Array<Device> {
  res.data = res.data || [];
  return res.data.map((device: Device) => {
    const newDevice: Device = cloneDeep(device);
    if (res.included) {
      newDevice.relationships = extractIncludes(newDevice.id, res.included);
    }
    return newDevice;
  });
}
