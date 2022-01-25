export type ProductivityRestServiceFixture = {
  loadDevices: jest.Mock;
  loadDevice: jest.Mock;
  updateDevice: jest.Mock;
  loadDeviceMeasurements: jest.Mock;
};
export const createProductivityRestServiceFixture = (): ProductivityRestServiceFixture => ({
  loadDevices: jest.fn(),
  loadDevice: jest.fn(),
  updateDevice: jest.fn(),
  loadDeviceMeasurements: jest.fn(),
});
