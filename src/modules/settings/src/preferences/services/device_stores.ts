import { createPreferenceDeviceStore, PreferenceDeviceStore } from "./device_store";
import { SettingDeviceStore } from "../../_common/device_store";

export type PreferenceDeviceStores = {
  preferenceDeviceStore: PreferenceDeviceStore
};

export const createPreferenceDeviceStores = (settingsStore: SettingDeviceStore): PreferenceDeviceStores => ({
  preferenceDeviceStore: createPreferenceDeviceStore(settingsStore)
});
