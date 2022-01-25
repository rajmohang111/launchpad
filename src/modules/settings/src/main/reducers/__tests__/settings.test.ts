import { SettingsState, createSettingsInitState } from "../settings";
import { createPreferencesStateInitState } from "../../../preferences/reducers/preferences";
import { createAccountStateInitState } from "../../../account/reducers/account";

describe("Settings Reducer", () => {

  describe("createSettingsInitState", () => {

    it("returns init state", () => {

      const stateExpected: SettingsState = {
        preferences: createPreferencesStateInitState(),
        account: createAccountStateInitState()
      };

      expect(createSettingsInitState()).toEqual(stateExpected);

    });

  });

});
