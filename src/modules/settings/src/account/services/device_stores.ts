import { SettingDeviceStore } from "../../_common/device_store";
import { AccountDeviceStore, createAccountDeviceStore } from "./device_store";

export type AccountDeviceStores = {
  accountDeviceStore: AccountDeviceStore
};

export const createAccountDeviceStores = (settingStore: SettingDeviceStore): AccountDeviceStores => ({
  accountDeviceStore: createAccountDeviceStore(settingStore)
});
