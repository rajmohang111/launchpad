import {Device, DeviceResponse, DevicesResponse} from "../models/device";
import {
  createDevice,
  createDevicesResponse,
  createMeasurementGroups
} from "../../__fixture__/createDeviceData";
import {MeasurementGroup, MeasurementGroupPayload, MeasurementGroups} from "../models/measurements";
import * as moment from "moment";
import {CalloutError, CalloutErrorType, ErrorType} from "../../../../../_common/error/error";
import {toDevices} from "./converter";
import {launchpadUrl} from "../../../../../_common/rest/models/rest";
import {fromNullable, some} from "fp-ts/lib/Option";
import { checkOrThrowCalloutError } from "../../../../../_common/rest/services/rest";

export enum DEVICE_SERVICES {
  GET_DEVICES = "GET_DEVICES",
  GET_DEVICE = "GET_DEVICE",
  UPDATE_DEVICE = "UPDATE_DEVICE",
  GET_DEVICE_MEASUREMENTS = "GET_DEVICE_MEASUREMENTS"
}

export type RequestParams = {
  auth: string,
  deviceId?: number | string,
  newDevice?: Device,
  cursor?: string,
  number?: string | number,
  start?: moment.Moment | Date | string | number,
  end?: moment.Moment | Date | string | number,
};

const getAuth = (auth: string) => auth && auth.indexOf("Basic") > -1 ? auth : `Basic ${auth}`;

export function createQueryParams(params: RequestParams): string {
  return [
    params.number && params.number !== null ? `number=${params.number}` : "number=2000",
    params.cursor && params.cursor !== null ? `cursor=${params.cursor}` : null,
    params.start && params.start !== null ? `from=${encodeURIComponent(moment(params.start).format())}` : null,
    params.end && params.end !== null ? `to=${encodeURIComponent(moment(params.end).format())}` : null,
  ].filter((param: string) => param && param !== null).join("&");
}

export const serviceUrls: Record<DEVICE_SERVICES, (params: RequestParams, host: string) => Request> = {
  [DEVICE_SERVICES.GET_DEVICES]: (params: RequestParams, host: string) => new Request(`${launchpadUrl(host)}/devices?number=200&include=[measurements,analytics]`, {
    method: "GET",
    headers: {
      "Authorization": getAuth(params.auth),
      "Content-Type": "application/vnd.karlmayer.launchpad.v1.device+json",
      "Accept": "application/vnd.karlmayer.launchpad.v1.device+json"
    }
  }),
  [DEVICE_SERVICES.GET_DEVICE]: (params: RequestParams, host: string) => new Request(`${launchpadUrl(host)}/device/${params.deviceId}?include=[measurements]`, {
    method: "GET",
    headers: {
      "Authorization": getAuth(params.auth),
      "Auth": getAuth(params.auth),
      "Content-Type": "application/vnd.karlmayer.launchpad.v1.device+json",
      "Accept": "application/vnd.karlmayer.launchpad.v1.device+json"
    }
  }),
  [DEVICE_SERVICES.UPDATE_DEVICE]: (params: RequestParams, host: string) => new Request(`${launchpadUrl(host)}/devices/${params.deviceId}`, {
    method: "PUT",
    headers: {
      "Authorization": getAuth(params.auth),
      "Content-Type": "application/vnd.karlmayer.launchpad.v1.device+json",
      "Accept": "application/vnd.karlmayer.launchpad.v1.device+json"
    },
    body: JSON.stringify({
      data: params.newDevice,
    }),
  }),
  [DEVICE_SERVICES.GET_DEVICE_MEASUREMENTS]: (params: RequestParams, host: string) =>
    new Request(`${launchpadUrl(host)}/devices/${params.deviceId}/measurementgroups?${createQueryParams(params)}`, {
      method: "GET",
      headers: {
        "Authorization": getAuth(params.auth),
        "Content-Type": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
        "Accept": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
      },
    }),
};

export type ProductivityRestService = {
  loadDevices: (auth: string) => Promise<Array<Device>>,
  loadDevice: (auth: string, deviceId: number) => Promise<Device>,
  updateDevice: (auth: string, deviceId: number, newDevice: Device) => Promise<boolean>,
  loadDeviceMeasurements: (params: RequestParams) => Promise<MeasurementGroups>,
};

export const initializeProductivityMockRestService = (): ProductivityRestService => {
  const loadDevices = (auth: string): Promise<Array<Device>> => {
    return Promise.resolve(createDevicesResponse(25))
    .then(toDevices);
  };

  const loadDevice = (auth: string, deviceId: number): Promise<Device> => {
    return Promise.resolve(createDevice(deviceId));
  };

  const updateDevice = (auth: string, deviceId: number, newDevice: Device): Promise<boolean> => {
    return Promise.resolve(true);
  };

  const loadDeviceMeasurements = (params: RequestParams): Promise<MeasurementGroups> => {
    return Promise.resolve(createMeasurementGroups(params.deviceId));
  };

  return {
    loadDevices,
    loadDevice,
    updateDevice,
    loadDeviceMeasurements,
  };
};

function getTimestamp(group: MeasurementGroup): string | null {
  return some(group)
  .mapNullable((m: MeasurementGroup) => m.attributes)
  .map((attr: MeasurementGroupPayload) => moment(attr.timestamp)
    .startOf("minute")
    .toISOString()
  )
  .toNullable();
}

function createEmptyMeasurementGroup(params: RequestParams, timestamp: string | Date): MeasurementGroup {
  return {
    type: "measurementgroups",
    id: "-1",
    links: {
      self: ""
    },
    attributes: {
      timestamp,
      deviceId: fromNullable(params.deviceId).getOrElse(-1),
      speed: {
        data: null,
        unit: "",
      },
      output: {
        data: null,
        unit: "",
      },
    }
  };
}

function generateTimeFrame(params: RequestParams, measurementGroups: ReadonlyArray<MeasurementGroup> = []): ReadonlyArray<MeasurementGroup> {
  const now: moment.Moment = params.end ? moment(params.end).startOf("minute") : moment().startOf("minute");
  const past: moment.Moment = params.start ? moment(params.start).startOf("minute") : now.subtract(1, "day").startOf("minute");
  const availableGroups: { [key: string]: MeasurementGroup } = measurementGroups.reduce((result, group) => {
    const timestamp = getTimestamp(group);
    if (timestamp && timestamp !== null) {
      result[timestamp] = group;
    }
    return result;
  }, {});
  const result: Array<MeasurementGroup> = [];
  let cursor: moment.Moment = moment(past);
  while (cursor.isSameOrBefore(now)) {
    if (availableGroups.hasOwnProperty(cursor.toISOString())) {
      result.push(availableGroups[cursor.toISOString()]);
    } else {
      result.push(createEmptyMeasurementGroup(params, cursor.toISOString()));
    }
    cursor = cursor.add(1, "minute");
  }
  return result;
}

function fillTimeframe(params: RequestParams): (mg: MeasurementGroups) => MeasurementGroups {
  return (mg: MeasurementGroups) => {
    return {
      paging: mg.paging,
      data: generateTimeFrame(params, mg.data),
    };
  };
}

const createProductivityRestServiceError = (error: Error) => new CalloutError(error.message, ErrorType.productivityCall, CalloutErrorType.error);

const checkOrThrow = checkOrThrowCalloutError(ErrorType.productivityCall);

export const initializeProductivityRestService = ({fetch}: GlobalFetch, host: string): ProductivityRestService => {
  const status = async (res: Response) => {
    if (res.status >= 200 && res.status < 300) {
      return Promise.resolve(res);
    }
    return Promise.reject(await toJson(res));
  };
  const toJson = (res: Response) => res.json();
  const extractDevicesData = (res: DevicesResponse) => res;
  const extractDeviceData = (res: DeviceResponse) => res.data;
  const toBoolean = (res: Response) => res.status >= 200 && res.status < 300;

  const loadDevices = (auth: string): Promise<Array<Device>> =>
    fetch(serviceUrls[DEVICE_SERVICES.GET_DEVICES]({auth}, host))
    .then(status)
    .then(toJson)
    .then(extractDevicesData)
    .then(toDevices)
    .catch((e) => {
      throw createProductivityRestServiceError(e);
    });

  const loadDevice = (auth: string, deviceId: string | number): Promise<Device> =>
    fetch(serviceUrls[DEVICE_SERVICES.GET_DEVICE]({auth, deviceId}, host))
    .then(status)
    .then(toJson)
    .then(extractDeviceData)
    .catch((e) => {
      throw createProductivityRestServiceError(e);
    });

  const updateDevice = async (auth: string, deviceId: string | number, newDevice: Device): Promise<boolean> =>{
    let response: Response;
    try {
      response = await fetch(serviceUrls[DEVICE_SERVICES.UPDATE_DEVICE]({auth, deviceId, newDevice}, host));
    } catch (e) {
      throw createProductivityRestServiceError(e);
    }
    await checkOrThrow(response.status, await response.text());
    return await toBoolean(response);
  };

  const loadDeviceMeasurements = (params: RequestParams): Promise<MeasurementGroups> =>
    fetch(serviceUrls[DEVICE_SERVICES.GET_DEVICE_MEASUREMENTS](params, host))
    .then(status)
    .then(toJson)
    .then(fillTimeframe(params))
    .catch((e) => {
      throw createProductivityRestServiceError(e);
    });

  return {
    loadDevices,
    loadDevice,
    updateDevice,
    loadDeviceMeasurements,
  };
};

export const createProductivityRestService = (globalFetch: GlobalFetch, host: string): ProductivityRestService =>
  // initializeProductivityMockRestService();
  initializeProductivityRestService(globalFetch, host);
