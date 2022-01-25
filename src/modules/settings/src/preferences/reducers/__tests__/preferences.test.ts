import { createPreferencesStateInitState, default as preferencesReducer, PreferencesState } from "../preferences";
import { createUpdatePreferenceSuccessAction, UpdatePreferenceSuccessAction } from "../../actions/preferences";
import { Locale } from "../../../../../../_common/i18n/IntlProvider";
import { createTestBootstrapAction } from "../../../../../../app/actions/__test_data__/bootstrap";
import { Preference } from "../../../../../../_common/models/settings";
import { createPreferenceFixture } from "../../../../../../_common/rest/models/__fixture__/settings";

describe("Preference Reducers", () => {

  const state: PreferencesState = createPreferencesStateInitState();
  const preference: Preference = createPreferenceFixture();

  describe("init", () => {
    it("create init state", () => {
      expect(createPreferencesStateInitState()).toEqual({
        language: Locale.en,
        hideTutorial: true
      });
    });
  });

  describe("bootstrapActionType", () => {

    it("updates preferences on bootstrap action", () => {

      const bootstrapAction = createTestBootstrapAction();
      const state: PreferencesState = {
        ...createPreferencesStateInitState(),
        hideTutorial: true
      };

      const updatedState = preferencesReducer(state, bootstrapAction);

      expect(updatedState).toEqual(bootstrapAction.deviceStore.settings.preference);

    });

  });

  describe("updatePreferenceSuccessActionType", () => {

    it("updates preference state", () => {

      const preferenceUpdateAction: UpdatePreferenceSuccessAction = createUpdatePreferenceSuccessAction(preference);
      const stateExpected: PreferencesState = {
        ...state,
        ...preferenceUpdateAction.preference
      };

      const stateReturned = preferencesReducer(state, preferenceUpdateAction);

      expect(stateReturned).toEqual(stateExpected);

    });

  });
});
