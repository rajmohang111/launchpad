import { createSettingTestStore, createTestSettings } from "../../../_common/__test_data__/device_store";
import { createPreferenceDeviceStore, Preference, PreferencePropertyKey } from "../device_store";
import { SettingsPropertyKey } from "../../../_common/device_store";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import { expectLaunchPadError } from "../../../../../../__test_util__/error";
import { Language } from "../../../../../../_common/models/settings";

describe("Preference DeviceStore", () => {

  const settingsStore = createSettingTestStore();
  const testSettings = createTestSettings();
  const store = createPreferenceDeviceStore(settingsStore);

  describe("loadPreference", () => {

    it("returns stored preference", async () => {

      settingsStore.loadSettingsProperty.mockReturnValue(Promise.resolve(testSettings.preference));

      const preferenceReturned = await store.loadPreference();

      expect(preferenceReturned).toEqual(testSettings.preference);

    });

  });

  describe("loadPreferenceProperty", () => {

    it("returns preference property", async () => {

      settingsStore.loadSettingsProperty.mockReturnValue(Promise.resolve(testSettings.preference));

      const preferencePropertyReturned = await store.loadPreferenceProperty(PreferencePropertyKey.language);

      expect(preferencePropertyReturned).toEqual(testSettings.preference.language);

    });

  });

  describe("savePreference", () => {

    it("saves preference to store", async () => {

      const newPreference: Preference = {
        language: Language.de,
        hideTutorial: true
      };

      await store.savePreference(newPreference);

      expect(settingsStore.saveSettingsProperty).toHaveBeenCalledWith(SettingsPropertyKey.preference, newPreference);

    });

  });

  describe("savePreferenceProperty", () => {

    it("updates preference property", async () => {

      settingsStore.loadSettingsProperty.mockResolvedValue(testSettings.preference);

      const updatedPreferenceExpected = {
        ...testSettings.preference,
        hideTutorial: true
      };

      await store.savePreferenceProperty(PreferencePropertyKey.hideTutorial, true);

      expect(settingsStore.saveSettingsProperty).toHaveBeenCalledWith(SettingsPropertyKey.preference, updatedPreferenceExpected);

    });

  });

  describe("Error handling", () => {

    it("throws preference store error in case settings store throws", async () => {

      const settingsStoreError = new LaunchPadError("Settings Store", ErrorType.settingsDeviceStore);
      settingsStore.saveSettingsProperty.mockRejectedValue(settingsStoreError);

      try {
        await store.savePreference(testSettings.preference);
        fail("Should throw");
      } catch (e) {
        expectLaunchPadError(e, ErrorType.preferenceDeviceStore);
      }

    });

  });

});
