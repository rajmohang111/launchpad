import { SettingDeviceStore, SettingsPropertyKey } from "../../_common/device_store";
import { ErrorType, LaunchPadError } from "../../../../../_common/error/error";
import { propertyObjectLoader, propertyObjectUpdater } from "../../../../../_common/storage/device_store";
import { Language } from "../../../../../_common/models/settings";

export type Preference = {
  language: Language,
  hideTutorial: boolean;
};

export enum PreferencePropertyKey {
  language = "language",
  hideTutorial = "hideTutorial"
}
export type PreferenceProperty = Language | boolean;

export type PreferenceDeviceStore = {
  loadPreference: () => Promise<Preference | null>,
  loadPreferenceProperty: (key: PreferencePropertyKey) => Promise<PreferenceProperty | null>,
  savePreference: (preference: Preference) => Promise<void>,
  savePreferenceProperty: (key: PreferencePropertyKey, value: PreferenceProperty) => Promise<void>
};

export const createInitPreference = (): Preference => ({
  language: Language.en,
  hideTutorial: false
});


const createPreferenceDeviceStoreError = (error: Error) => new LaunchPadError(error.message, ErrorType.preferenceDeviceStore);
export const createPreferenceDeviceStore = (store: SettingDeviceStore): PreferenceDeviceStore => {

  const loadPreference = async (): Promise<Preference | null> => {

    try {
      return await store.loadSettingsProperty(SettingsPropertyKey.preference) as Preference;
    } catch (e) {
      throw createPreferenceDeviceStoreError(e);
    }

  };


  const loadPreferenceProperty = async (key: PreferencePropertyKey): Promise<PreferenceProperty | null> => {

    try {
      const preference = await loadPreference();
      return propertyObjectLoader(key, preference);
    } catch (e) {
      throw createPreferenceDeviceStoreError(e);
    }

  };

  const savePreference = async (preference: Preference): Promise<void> => {
    try {
      await store.saveSettingsProperty(SettingsPropertyKey.preference, preference);
    } catch (e) {
      throw createPreferenceDeviceStoreError(e);
    }
  };


  const savePreferenceProperty = async (key: PreferencePropertyKey, value: PreferenceProperty) => {

    try {
      const oldPreference = await loadPreference();
      const updatedPreference = propertyObjectUpdater(key, oldPreference, value, createInitPreference());
      return savePreference(updatedPreference);
    } catch (e) {
      throw createPreferenceDeviceStoreError(e);
    }

  };

  return {
    loadPreference,
    loadPreferenceProperty,
    savePreference,
    savePreferenceProperty
  };

};
