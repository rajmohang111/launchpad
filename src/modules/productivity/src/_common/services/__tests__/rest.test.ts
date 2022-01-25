import {
  createQueryParams,
  initializeProductivityMockRestService,
  initializeProductivityRestService,
  ProductivityRestService,
  RequestParams
} from "../rest";
import * as fetchMock from "jest-fetch-mock";
import {Device, DeviceResponse, DevicesResponse} from "../../models/device";
import {createDevice} from "../../../__fixture__/createDeviceData";
import {adamosHost, launchpadUrl} from "../../../../../../_common/rest/models/rest";

describe("Productivity Rest Service", () => {

  const start = "1970-01-01T00:00:00.000Z";
  const end = "1970-01-01T00:00:00.000Z";
  let restService: ProductivityRestService;
  let mockRestService: ProductivityRestService;
  const host = adamosHost;

  beforeEach(() => {
    fetchMock.resetMocks();
    restService = initializeProductivityRestService({fetch: fetchMock}, host);
    mockRestService = initializeProductivityMockRestService();
  });

  describe("loadDevices", () => {

    it("loads devices", async () => {
      const testResponse: DevicesResponse = {
        data: [
          {
            type: "devices",
            id: 1,
            attributes: {
              metaData: {
                code: "01",
                number: "012345",
                name: "Device #01"
              },
            }
          },
          {
            type: "devices",
            id: 2,
            attributes: {
              metaData: {
                code: "02",
                number: "023456",
                name: "Device #02"
              },
            }
          }
        ]
      };
      fetchMock.mockResponse(JSON.stringify(testResponse), {status: 200});

      const devices = await restService.loadDevices("someAuth");
      expect(fetchMock.mock.calls[0][0].method).toEqual("GET");
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(devices).toEqual(testResponse.data);
    });

    it("fails to load devices due to http status 415", async () => {
      const error = new Error("Unsupported Media Type");
      fetchMock.mockRejectedValue(error);

      try {
        await restService.loadDevices("someAuth");
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0].method).toEqual("GET");
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Unsupported Media Type"));
      }
    });

    it("fails to load devices due to http status 500", async () => {
      const error = new Error("Internal Server Error");
      fetchMock.mockRejectedValue(error);
      try {
        await restService.loadDevices("someAuth");
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0].method).toEqual("GET");
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Internal Server Error"));
      }
    });

    it("fails to load devices", async () => {
      const expectedError = new Error("Error for testing purposes");
      fetchMock.mockReject(expectedError);

      try {
        await restService.loadDevices("someAuth");
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0].method).toEqual("GET");
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(expectedError);
      }
    });
  });

  describe("loadDevice", () => {

    it("loads a single device", async () => {
      const testDevice: Device = {
        type: "devices",
        id: 1,
        attributes: {
          metaData: {
            code: "01",
            number: "012345",
            name: "Device #01"
          },
        }
      };
      fetchMock.mockResponse(JSON.stringify({
        data: testDevice,
      }), {status: 200});

      const device: Device = await restService.loadDevice("someAuth", testDevice.id);
      expect(fetchMock.mock.calls[0][0].method).toEqual("GET");
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(device).toEqual(testDevice);
    });

    it("fails to load the device due to http status 404", async () => {
      const error = new Error("Not Found");
      fetchMock.mockRejectedValue(error);
      try {
        await restService.loadDevice("someAuth", 1);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0].method).toEqual("GET");
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Not Found"));
      }
    });

    it("fails to load the device due to http status 415", async () => {
      const error = new Error("Unsupported Media Type");
      fetchMock.mockRejectedValue(error);

      try {
        await restService.loadDevice("someAuth", 1);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0].method).toEqual("GET");
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Unsupported Media Type"));
      }
    });

    it("fails to load the device due to http status 500", async () => {
      const error = new Error("Internal Server Error");
      fetchMock.mockRejectedValue(error);

      try {
        await restService.loadDevice("someAuth", 1);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0].method).toEqual("GET");
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Internal Server Error"));
      }
    });

    it("fails to load the device", async () => {
      const expectedError = new Error("Error for testing purposes");
      fetchMock.mockReject(expectedError);

      try {
        await restService.loadDevice("someAuth", 1);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0].method).toEqual("GET");
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(expectedError);
      }
    });
  });

  describe("updateDevice", () => {
    const testDevice = {
      type: "devices",
      id: 1,
      attributes: {
        metaData: {
          code: "0101",
          number: "012345",
          name: "Device #01"
        },
      }
    };
    const testResponse: DeviceResponse = {
      data: testDevice
    };

    it("updates a single device", async () => {
      fetchMock.mockResponse(JSON.stringify(testResponse), {status: 204});

      const hasUpdated: boolean = await restService.updateDevice("someAuth", testDevice.id, testDevice);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock.mock.calls[0][0]).toMatchObject({
        method: "PUT",
        body: JSON.stringify({
          data: testDevice,
        }),
      });
      expect(hasUpdated).toBeTruthy();
    });

    it("fails to update the device due to http status 400", async () => {
      const error = new Error("Bad Request");
      fetchMock.mockRejectedValue(error);

      try {
        await restService.updateDevice("someAuth", testDevice.id, testDevice);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0]).toMatchObject({
          method: "PUT",
          body: JSON.stringify({
            data: testDevice,
          }),
        });
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Bad Request"));
      }
    });

    it("fails to update the device due to http status 404", async () => {
      const error = new Error("Not Found");
      fetchMock.mockRejectedValue(error);

      try {
        await restService.updateDevice("someAuth", 1, testDevice);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0]).toMatchObject({
          method: "PUT",
          body: JSON.stringify({
            data: testDevice,
          }),
        });
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Not Found"));
      }
    });

    it("fails to update the device due to http status 415", async () => {
      const error = new Error("Unsupported Media Type");
      fetchMock.mockRejectedValue(error);

      try {
        await restService.updateDevice("someAuth", 1, testDevice);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0]).toMatchObject({
          method: "PUT",
          body: JSON.stringify({
            data: testDevice,
          }),
        });
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Unsupported Media Type"));
      }
    });

    it("fails to update the device due to http status 500", async () => {
      const error = new Error("Internal Server Error");
      fetchMock.mockRejectedValue(error);

      try {
        await restService.updateDevice("someAuth", 1, testDevice);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0]).toMatchObject({
          method: "PUT",
          body: JSON.stringify({
            data: testDevice
          }),
        });
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Internal Server Error"));
      }
    });

    it("fails to update the device", async () => {
      const expectedError = new Error("Error for testing purposes");
      fetchMock.mockReject(expectedError);

      try {
        await restService.updateDevice("someAuth", 1, testDevice);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock.mock.calls[0][0]).toMatchObject({
          method: "PUT",
          body: JSON.stringify({
            data: testDevice,
          }),
        });
        expect(err).toEqual(expectedError);
      }
    });
  });

  describe("loadDeviceMeasurements", () => {
    it("should fetch the data from the backend - no additional params", async () => {
      fetchMock.mockResponse(JSON.stringify({}), {status: 200});
      const requestParams: RequestParams = {
        auth: "someAuth",
        deviceId: 4711,
        start,
        end,
      };
      const measurementGroups = await restService.loadDeviceMeasurements(requestParams);
      expect(measurementGroups).toEqual({
        data: [
          {
            "attributes": {
              "deviceId": 4711,
              "output": {"data": null, "unit": ""},
              "speed": {"data": null, "unit": ""},
              "timestamp": requestParams.start
            },
            "id": "-1",
            "links": {"self": ""},
            "type": "measurementgroups"
          }
        ],
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(new Request(
        `${launchpadUrl(host)}/devices/${requestParams.deviceId}/measurementgroups?${createQueryParams(requestParams)}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Basic ${requestParams.auth}`,
            "Content-Type": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
            "Accept": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
          },
        }
      ));
    });

    it("should fetch the data from the backend - added number", async () => {
      fetchMock.mockResponse(JSON.stringify({}), {status: 200});
      const requestParams: RequestParams = {
        auth: "someAuth",
        deviceId: 4711,
        number: 20,
        start,
        end,
      };
      const measurementGroups = await restService.loadDeviceMeasurements(requestParams);
      expect(measurementGroups).toEqual({
        data: [
          {
            "attributes": {
              "deviceId": 4711,
              "output": {"data": null, "unit": ""},
              "speed": {"data": null, "unit": ""},
              "timestamp": requestParams.start,
            },
            "id": "-1",
            "links": {"self": ""},
            "type": "measurementgroups"
          }
        ],
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(new Request(
        `${launchpadUrl(host)}/devices/${requestParams.deviceId}/measurementgroups?${createQueryParams(requestParams)}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Basic ${requestParams.auth}`,
            "Content-Type": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
            "Accept": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
          },
        }
      ));
    });

    it("should fetch the data from the backend - added cursor", async () => {
      fetchMock.mockResponse(JSON.stringify({}), {status: 200});
      const requestParams: RequestParams = {
        auth: "someAuth",
        deviceId: 4711,
        cursor: btoa("201"),
        start,
        end,
      };
      const measurementGroups = await restService.loadDeviceMeasurements(requestParams);
      expect(measurementGroups).toEqual({
        data: [
          {
            "attributes": {
              "deviceId": 4711,
              "output": {"data": null, "unit": ""},
              "speed": {"data": null, "unit": ""},
              "timestamp": start
            },
            "id": "-1",
            "links": {"self": ""},
            "type": "measurementgroups"
          }
        ],
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(new Request(
        `${launchpadUrl(host)}/devices/${requestParams.deviceId}/measurementgroups?${createQueryParams(requestParams)}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Basic ${requestParams.auth}`,
            "Content-Type": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
            "Accept": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
          },
        }
      ));
    });

    it("should fetch the data from the backend - added from", async () => {
      fetchMock.mockResponse(JSON.stringify({}), {status: 200});
      const requestParams: RequestParams = {
        auth: "someAuth",
        deviceId: 4711,
        start: "2018-01-01T00:00:00.000Z",
        end: "2018-01-01T00:00:00.000Z",
      };
      const measurementGroups = await restService.loadDeviceMeasurements(requestParams);
      expect(measurementGroups).toEqual({
        data: [
          {
            "attributes": {
              "deviceId": 4711,
              "output": {"data": null, "unit": ""},
              "speed": {"data": null, "unit": ""},
              "timestamp": requestParams.start
            },
            "id": "-1",
            "links": {"self": ""},
            "type": "measurementgroups"
          }
        ],
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(new Request(
        `${launchpadUrl(host)}/devices/${requestParams.deviceId}/measurementgroups?${createQueryParams(requestParams)}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Basic ${requestParams.auth}`,
            "Content-Type": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
            "Accept": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
          },
        }
      ));
    });

    it("should fetch the data from the backend - added start", async () => {
      fetchMock.mockResponse(JSON.stringify({}), {status: 200});
      const requestParams: RequestParams = {
        auth: "someAuth",
        deviceId: 4711,
        start: "2018-01-01T00:00:00.000Z",
        end: "2018-01-01T00:00:00.000Z",
      };
      const measurementGroups = await restService.loadDeviceMeasurements(requestParams);
      expect(measurementGroups).toEqual({
        data: [
          {
            "attributes": {
              "deviceId": 4711,
              "output": {"data": null, "unit": ""},
              "speed": {"data": null, "unit": ""},
              "timestamp": requestParams.start,
            },
            "id": "-1",
            "links": {"self": ""},
            "type": "measurementgroups"
          }
        ],
      });
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(new Request(
        `${launchpadUrl(host)}/devices/${requestParams.deviceId}/measurementgroups?${createQueryParams(requestParams)}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Basic ${requestParams.auth}`,
            "Content-Type": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
            "Accept": "application/vnd.karlmayer.launchpad.v1.measurementgroups+json",
          },
        }
      ));
    });

    it("fails to fetch the data due to http status 404", async () => {
      const error = new Error("Not Found");
      fetchMock.mockRejectedValue(error);
      const requestParams: RequestParams = {
        auth: "someAuth",
        deviceId: 4711,
        cursor: btoa("201"),
        start,
        end,
      };
      try {
        await restService.loadDeviceMeasurements(requestParams);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Not Found"));
      }
    });

    it("fails to fetch the data due to http status 415", async () => {
      const error = new Error("Unsupported Media Type");
      fetchMock.mockRejectedValue(error);
      const requestParams: RequestParams = {
        auth: "someAuth",
        deviceId: 4711,
        cursor: btoa("201"),
      };
      try {
        await restService.loadDeviceMeasurements(requestParams);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Unsupported Media Type"));
      }
    });

    it("fails to fetch the data due to http status 500", async () => {
      const error = new Error("Internal Server Error");
      fetchMock.mockRejectedValue(error);
      const requestParams: RequestParams = {
        auth: "someAuth",
        deviceId: 4711,
        cursor: btoa("201"),
      };
      try {
        await restService.loadDeviceMeasurements(requestParams);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(new Error("Internal Server Error"));
      }
    });

    it("fails to fetch the data", async () => {
      const expectedError = new Error("Error for testing purposes");
      fetchMock.mockReject(expectedError);
      const requestParams: RequestParams = {
        auth: "someAuth",
        deviceId: 4711,
        cursor: btoa("201"),
      };
      try {
        await restService.loadDeviceMeasurements(requestParams);
        fail(new Error("Expected the request to fail"));
      } catch (err) {
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(err).toEqual(expectedError);
      }
    });
  });

  it("Mock Service", () => {
    const auth = "authString";
    mockRestService.loadDevices(auth)
      .then((response: Array<Device>) => expect(response).toBeTruthy());
    mockRestService.loadDevice(auth, 1)
      .catch(error => expect(error).toEqual(new Error("Not yet implemented")));
    mockRestService.updateDevice(auth, 1, createDevice(1))
      .then(res => expect(res).not.toBeNull());
    mockRestService.loadDeviceMeasurements({auth})
      .catch(error => expect(error).toEqual(new Error("Not yet implemented")));
  });

});
