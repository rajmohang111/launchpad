import { createTestDeviceStore, TestDeviceStore } from "../../../../../_common/storage/__test_data__/test_device_store";
import {
  createSettingsDeviceStore,
  Settings,
  SettingsPropertyKey,
  settingsStoreKey,
  SettingDeviceStore
} from "../device_store";
import { ErrorType } from "../../../../../_common/error/error";
import { createTestSettings } from "../__test_data__/device_store";
import { expectLaunchPadError } from "../../../../../__test_util__/error";
import { Preference } from "../../preferences/services/device_store";
import { createAccountInit } from "../../account/services/device_store";

describe("Settings DeviceStore", () => {

  const testSettings: Settings = createTestSettings();
  let store: TestDeviceStore;
  let settingsStore: SettingDeviceStore;

  beforeEach(() => {
    store = createTestDeviceStore();
    settingsStore = createSettingsDeviceStore(store);
  });

  describe("load settings", () => {

    it("returns settings from store", async () => {

      store.get.mockReturnValue(Promise.resolve(testSettings));

      const settingsReturned = await settingsStore.loadSettings();

      expect(settingsReturned).toEqual(testSettings);
      expect(store.get).toHaveBeenCalledWith(settingsStoreKey);

    });

    it("returns null in case nothing is in store for key", async () => {

      store.get.mockReturnValue(Promise.resolve(null));

      const settingsReturned = await settingsStore.loadSettings();

      expect(settingsReturned).toEqual(null);
      expect(store.get).toHaveBeenCalledWith(settingsStoreKey);

    });

    it("returns settings error in case loading of settings from store fails", async () => {

      store.get.mockReturnValue(Promise.reject(new Error("DeviceStore error")));

      try {
        await settingsStore.loadSettings();
        fail("Should throw");
      } catch (e) {
        expectLaunchPadError(e, ErrorType.settingsDeviceStore);
      }


    });

  });

  describe("loadSettingsProperty", () => {

    it("returns settings property", async () => {

      store.get.mockResolvedValue(testSettings);

      const propertyReturned = await settingsStore.loadSettingsProperty(SettingsPropertyKey.preference);

      expect(propertyReturned).toEqual(testSettings.preference);

    });

  });

  describe("saveSettings", () => {

    it("saves given settings to store", async () => {

      await settingsStore.saveSettings(testSettings);

      expect(store.put).toHaveBeenCalledWith(settingsStoreKey, testSettings);

    });

    it("returns settings error in case saving of settings fails", async () => {

      store.put.mockReturnValue(Promise.reject(new Error("DeviceStore Error")));

      try {
        await settingsStore.saveSettings(testSettings);
        fail("Should throw");
      } catch (e) {
        expectLaunchPadError(e, ErrorType.settingsDeviceStore);
      }

    });

  });

  describe("saveSettingsProperty", () => {

    it("updates settings property", async () => {

      store.get.mockResolvedValue(testSettings);

      const updatedPreference: Preference = {
        ...testSettings.preference,
        hideTutorial: true
      };

      const settingsExpected: Settings = {
        ...testSettings,
        preference: updatedPreference
      };

      await settingsStore.saveSettingsProperty(SettingsPropertyKey.preference, updatedPreference);

      expect(store.put).toHaveBeenCalledWith(settingsStoreKey, settingsExpected);

    });

    it("saves preference property when no settings have been stored", async () => {

      store.get.mockResolvedValue(null);
      const settingsExpected: Settings = {
        preference: testSettings.preference,
        account: createAccountInit()
      };

      await settingsStore.saveSettingsProperty(SettingsPropertyKey.preference, testSettings.preference);

      expect(store.put).toHaveBeenCalledWith(settingsStoreKey, settingsExpected);

    });

  });

});
