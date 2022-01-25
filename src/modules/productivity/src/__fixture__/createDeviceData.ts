import * as moment from "moment";
import {
  Analytics,
  AnalyticsRelationship,
  Device,
  DevicesResponse,
  Measurement,
  MeasurementRelationship,
} from "../_common/models/device";
import {MeasurementGroup, MeasurementGroups} from "../_common/models/measurements";

/**
 * Taken from https://stackoverflow.com/a/1527820/2185585
 *
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNumberString() {
  return "xxxxxxxx".replace(/[x]/g, () => {
    return getRandomInt(0, 9).toString(10);
  });
}

export function createDevice(id: number = 1): Device {
  const maxSpeed = getRandomInt(0, 4500);
  const maxOutput = getRandomInt(0, 150);
  const targetSpeed = getRandomInt(0, maxSpeed);
  const targetOutput = getRandomInt(0, maxOutput);
  const targetPerformance = getRandomInt(0, 100);
  return {
    type: "devices",
    id,
    attributes: {
      metaData: {
        code: generateNumberString(),
        number: generateNumberString(),
        name: `Device #${id}`
      },
      settings: {
        targetSpeed: {
          data: targetSpeed,
          unit: "rpm"
        },
        targetOutput: {
          data: targetOutput,
          unit: "ft"
        },
        targetPerformance: {
          data: targetPerformance,
          unit: "percent"
        }
      },
      performanceData: {
        maxSpeed: {
          data: maxSpeed,
          unit: "rpm"
        },
        maxOutput: {
          data: maxOutput,
          unit: "ft"
        }
      },
    },
  };
}

export function createDevices(num: number = 10): Array<Device> {
  const result: Array<Device> = [];
  for (let idx = 1, len = num; idx <= len; idx++) {
    result.push(createDevice(idx));
  }
  return result;
}

export function createSpeedMeasurement(id: number = 1, deviceId: number | string = 1, timestamp: string = moment().toISOString()): Measurement {
  return {
    type: "measurements",
    id: `${id}`,
    attributes: {
      deviceId,
      type: "speed",
      data: getRandomInt(1500, 2000),
      unit: "rpm",
      timestamp,
    },
    links: {
      self: `/measurements/${id}`
    }
  };
}

export function createOutputMeasurement(id: number = 1, deviceId: number | string = 1, timestamp: string = moment().toISOString()): Measurement {
  return {
    type: "measurements",
    id: `${id}`,
    attributes: {
      deviceId,
      type: "output",
      data: getRandomInt(80, 120),
      unit: "mh",
      timestamp,
    },
    links: {
      self: `/measurements/${id}`
    }
  };
}

export function createAnalytics(id: number = 1, deviceId: number | string = 1, timestamp: string = moment().toISOString()): Analytics {
  return {
    type: "analytics",
    id: `${id}`,
    attributes: {
      "deviceId": deviceId,
      "availability": {
        "data": `${getRandomInt(25, 95)}`,
        "unit": "percent"
      },
      "performance": {
        "data": `${getRandomInt(25, 95)}`,
        "unit": "percent"
      },
      "timeRange": {
        "start": moment(timestamp).subtract(1, "day").toISOString(),
        "end": timestamp,
      }
    },
    "links": {
      "self": `/analytics/${id}`
    }
  };
}

export function createMeasurements(devices: Array<Device> = []): Array<Measurement> {
  const result: Array<Measurement> = [];
  let idx: number = 1;
  for (const device of devices) {
    result.push(createSpeedMeasurement(idx++, device.id));
    result.push(createOutputMeasurement(idx++, device.id));
  }
  return result;
}

export function createAnalyticsData(devices: Array<Device> = []): Array<Analytics> {
  const result: Array<Analytics> = [];
  let idx: number = 1;
  for (const device of devices) {
    result.push(createAnalytics(idx++, device.id));
  }
  return result;
}

export function createMeasurementInclude(devices: Array<Device> = []): MeasurementRelationship {
  return {
    data: createMeasurements(devices),
    links: {
      related: ""
    }
  };
}

export function createAnalyticsInclude(devices: Array<Device> = []): AnalyticsRelationship {
  return {
    data: createAnalyticsData(devices),
    links: {
      related: "",
    }
  };
}

export function createIncludes(devices: Array<Device> = []): Array<AnalyticsRelationship | MeasurementRelationship> {
  return [
    createMeasurementInclude(devices),
    createAnalyticsInclude(devices),
  ];
}

export function createDevicesResponse(num: number = 10): DevicesResponse {
  const devices = createDevices(num);
  return {
    data: devices,
    included: createIncludes(devices),
  };
}

export function createMeasurementGroup(id: number = 1, deviceId: number | string = 1, timestamp: string = moment().toISOString()): MeasurementGroup {
  return {
    type: "measurementgroups",
    id: `${id}`,
    attributes: {
      deviceId,
      speed: {
        data: getRandomInt(2000, 2050),
        unit: "rpm",
      },
      output: {
        data: getRandomInt(120, 150),
        unit: "mh",
      },
      timestamp,
    },
    links: {
      self: `/measurementgroups/${id}`
    }
  };
}

export function createMeasurementGroups(deviceId: number | string = 1): MeasurementGroups {
  const data: Array<MeasurementGroup> = [];
  const now = moment();
  let past = moment(now).subtract(1, "day");
  let idx = 1;
  while (past.isBefore(now)) {
    data.push(createMeasurementGroup(idx++, deviceId, past.toISOString()));
    past = moment(past).add(1, "minute");
  }
  return {
    data,
    paging: {
      cursors: {
        current: `/device/${deviceId}/measurementgroups?cursor=${btoa(`${idx}`)}`,
        before: `/device/${deviceId}/measurementgroups?cursor=${btoa(`${idx - 1}`)}`,
        after: `/device/${deviceId}/measurementgroups?cursor=${btoa(`${idx + 1}`)}`,
      }
    }
  };
}
