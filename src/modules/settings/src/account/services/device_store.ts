import { SettingDeviceStore, SettingsPropertyKey } from "../../_common/device_store";
import { SharedAccountDeviceStore } from "../../../../../_common/stores/settings";
import { Account, Salutation } from "../../../../../_common/models/settings";
import { ErrorType, LaunchPadError } from "../../../../../_common/error/error";
import { Region } from "../../../../../_common/models/system";

export type AccountDeviceStore = SharedAccountDeviceStore & {
  clear: () => Promise<void>
};

export const createAccountInit = (): Account => ({
  person: {
    firstName: "",
    lastName: "",
    salutation: Salutation.MR,
    customerNumber: ""
  },
  contact: {
    eMail: "",
    mobileNumber: ""
  },
  credential: {
    region: Region.OTHER,
    username: "",
    password: ""
  },
  metadata: {
    isEmailVerified: false,
    isActive: false,
  }
});

const createAccountDeviceStoreError = (e: Error) => new LaunchPadError(e.message, ErrorType.accountDeviceStore);

export const createAccountDeviceStore = (settingsStore: SettingDeviceStore): AccountDeviceStore => {

  const saveAccount = async (account: Account): Promise<void> => {

    try {
      await settingsStore.saveSettingsProperty(SettingsPropertyKey.account, account);
    } catch (e) {
      throw createAccountDeviceStoreError(e);
    }


  };

  const clear = async (): Promise<void> => {

    try {
      await settingsStore.saveSettingsProperty(SettingsPropertyKey.account, createAccountInit());
    } catch (e) {
      throw createAccountDeviceStoreError(e);
    }


  };

  return {
    saveAccount,
    clear
  };


};
