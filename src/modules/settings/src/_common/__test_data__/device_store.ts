import { Settings } from "../device_store";
import {
  createTestPreference,
  createTestPreferenceStores,
  TestPreferenceStores
} from "../../preferences/services/__test_data__/device_store";
import {
  createTestAccountDeviceStores,
  TestAccountDeviceStores
} from "../../account/services/__fixtures__/device_store";
import { createAccountFixture } from "../../../../../_common/models/__fixture__/settings";

export type TestSettingStore = {
  loadSettings: jest.Mock,
  loadSettingsProperty: jest.Mock,
  saveSettings: jest.Mock,
  saveSettingsProperty: jest.Mock
};
export const createSettingTestStore = (): TestSettingStore => ({
  loadSettings: jest.fn(),
  loadSettingsProperty: jest.fn(),
  saveSettings: jest.fn(),
  saveSettingsProperty: jest.fn()
});

export type TestSettingsStores = {
  settingsDeviceStore: TestSettingStore,
  preferenceDeviceStores: TestPreferenceStores,
  accountDeviceStores: TestAccountDeviceStores
};
export const createTestSettingsStores = (): TestSettingsStores => ({
  settingsDeviceStore: createSettingTestStore(),
  preferenceDeviceStores: createTestPreferenceStores(),
  accountDeviceStores: createTestAccountDeviceStores()
});

export const createTestSettings = (): Settings => ({
  preference: createTestPreference(),
  account: createAccountFixture()
});
