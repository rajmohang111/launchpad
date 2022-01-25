import { Preference } from "../device_store";
import { Language } from "../../../../../../_common/models/settings";

export const createTestPreference = (): Preference => ({
  language: Language.en,
  hideTutorial: false
});

export type TestPreferenceStore = {
  loadPreference: jest.Mock,
  loadPreferenceProperty: jest.Mock,
  savePreference: jest.Mock,
  savePreferenceProperty: jest.Mock
};
export const createPreferenceTestStore = (): TestPreferenceStore => ({
  loadPreference: jest.fn(),
  loadPreferenceProperty: jest.fn(),
  savePreference: jest.fn(),
  savePreferenceProperty: jest.fn()
});

export type TestPreferenceStores = {
  preferenceDeviceStore: TestPreferenceStore
};
export const createTestPreferenceStores = (): TestPreferenceStores => ({
  preferenceDeviceStore: createPreferenceTestStore()
});
