import { AccountDeviceStore } from "../../modules/settings/src/account/services/device_store";

export const logout = (accountDeviceStore: AccountDeviceStore): Promise<void> =>
  accountDeviceStore.clear();
