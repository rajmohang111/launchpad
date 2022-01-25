import {
  createTestSettingsStores,
  TestSettingsStores
} from "../../../modules/settings/src/_common/__test_data__/device_store";

export type TestDeviceStore = {
  put: jest.Mock,
  get: jest.Mock
};
export const createTestDeviceStore = (): TestDeviceStore => ({
  put: jest.fn(),
  get: jest.fn()
});
export type TestDeviceStores = {
  store: TestDeviceStore,
  settingsDeviceStores: TestSettingsStores,
};
export const createTestDeviceStores = (): TestDeviceStores => ({
  store: createTestDeviceStore(),
  settingsDeviceStores: createTestSettingsStores(),
});
