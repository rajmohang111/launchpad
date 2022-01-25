import { createPreferenceDeviceStores, PreferenceDeviceStores } from "../preferences/services/device_stores";
import { createSettingsDeviceStore, SettingDeviceStore } from "./device_store";
import { DeviceStore } from "../../../../_common/storage/components/DeviceStoreProvider";
import { AccountDeviceStores, createAccountDeviceStores } from "../account/services/device_stores";

export type SettingsDeviceStores = {
  settingsDeviceStore: SettingDeviceStore,
  preferenceDeviceStores: PreferenceDeviceStores,
  accountDeviceStores: AccountDeviceStores
};

export const createSettingsDeviceStores = (store: DeviceStore): SettingsDeviceStores => {
  const settingsDeviceStore = createSettingsDeviceStore(store);
  return {
    settingsDeviceStore,
    preferenceDeviceStores: createPreferenceDeviceStores(settingsDeviceStore),
    accountDeviceStores: createAccountDeviceStores(settingsDeviceStore)
  };
};
