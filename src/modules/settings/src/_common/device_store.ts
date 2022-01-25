import { DeviceStore } from "../../../../_common/storage/components/DeviceStoreProvider";
import { createInitPreference, Preference } from "../preferences/services/device_store";
import { propertyObjectLoader, propertyObjectUpdater } from "../../../../_common/storage/device_store";
import { ErrorType, LaunchPadError } from "../../../../_common/error/error";
import { createAccountInit } from "../account/services/device_store";
import { Account } from "../../../../_common/models/settings";

export const settingsStoreKey = "settings";

export type SettingsProperty =
  Preference |
  Account;
export enum SettingsPropertyKey {
  preference = "preference",
  account = "account"
}
export type Settings = {
  preference: Preference,
  account: Account
};

export type SettingDeviceStore = {
  loadSettings: () => Promise<Settings>,
  loadSettingsProperty: (key: SettingsPropertyKey) => Promise<SettingsProperty | null>
  saveSettings: (settings: Settings) => Promise<void>,
  saveSettingsProperty: (key: SettingsPropertyKey, property: SettingsProperty) => Promise<void>;
};

export const createInitSettings = (): Settings => ({
  preference: createInitPreference(),
  account: createAccountInit()
});

const createSettingsDeviceStoreError = (error: Error) => new LaunchPadError(error.message, ErrorType.settingsDeviceStore);
export const createSettingsDeviceStore = (store: DeviceStore): SettingDeviceStore => {

  const loadSettings = async (): Promise<Settings> => {

    try {
      return await store.get<Settings>(settingsStoreKey);
    } catch (e) {
      throw createSettingsDeviceStoreError(e);
    }

  };
  const loadSettingsProperty = async (key: SettingsPropertyKey): Promise<SettingsProperty | null> => {

    try {
      const settings = await loadSettings();
      return propertyObjectLoader(key, settings);
    } catch (e) {
      throw createSettingsDeviceStoreError(e);
    }

  };
  const saveSettings = async (settings: Settings): Promise<void> => {

    try {
      await store.put(settingsStoreKey, settings);
    } catch (e) {
      throw createSettingsDeviceStoreError(e);
    }

  };
  const saveSettingsProperty = async (key: SettingsPropertyKey, property: SettingsProperty) => {

    try {
      const settings = await loadSettings();
      const updatedSettings = propertyObjectUpdater(key, settings, property, createInitSettings());
      return saveSettings(updatedSettings);
    } catch (e) {
      throw createSettingsDeviceStoreError(e);
    }

  };

  return {
    loadSettings,
    loadSettingsProperty,
    saveSettings,
    saveSettingsProperty
  };

};
