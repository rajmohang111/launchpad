import {
  createUpdatePreferenceAction,
  createUpdatePreferenceErrorAction,
  createUpdatePreferenceSuccessAction, UpdatePreferenceErrorAction,
  updatePreferenceErrorActionType,
  UpdatePreferenceSuccessAction,
  updatePreferenceSuccessActionType,
} from "../preferences";
import { createUpdateTranslationAction } from "../../../../../../app/actions/translation";
import { createPreferenceTestStore, TestPreferenceStore } from "../../services/__test_data__/device_store";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import { expectLaunchPadError } from "../../../../../../__test_util__/error";
import { Preference } from "../../../../../../_common/models/settings";
import { createPreferenceFixture } from "../../../../../../_common/rest/models/__fixture__/settings";
import { Locale } from "../../../../../../_common/i18n/IntlProvider";

describe("Preferences Action", () => {

  const dispatch = jest.fn();
  const preference: Preference = createPreferenceFixture();
  let preferenceStore: TestPreferenceStore;

  beforeEach(() => {
    preferenceStore = createPreferenceTestStore();
    dispatch.mockClear();
  });


  describe("createUpdatePreferenceSuccessAction", () => {

    it("creates action", () => {

      const actionExpected: UpdatePreferenceSuccessAction = {
        type: updatePreferenceSuccessActionType,
        preference
      };

      expect(createUpdatePreferenceSuccessAction(preference)).toEqual(actionExpected);

    });

  });

  describe("createUpdatePreferenceErrorAction", () => {

    it("creates action", () => {

      const errorExpected = new LaunchPadError("Store Error", ErrorType.preferenceDeviceStore);
      const errorActionExpected: UpdatePreferenceErrorAction = {
        type: updatePreferenceErrorActionType,
        error: errorExpected,
        preference
      };

      const actionReturned = createUpdatePreferenceErrorAction(errorExpected, preference);

      expect(actionReturned).toEqual(errorActionExpected);

    });

  });

  describe("createUpdatePreferenceAction", () => {

    it("updates preference in store and dispatches actions", async () => {

      const actionExpected: UpdatePreferenceSuccessAction = {
        type: updatePreferenceSuccessActionType,
        preference
      };

      await createUpdatePreferenceAction(preference, preferenceStore)(dispatch, jest.fn(), undefined);

      expect(preferenceStore.savePreference).toHaveBeenCalledWith(preference);
      expect(dispatch).toHaveBeenCalledWith(actionExpected);
      expect(dispatch).toHaveBeenCalledWith(createUpdateTranslationAction(Locale[preference.language]));
    });

    it("dispatches error action in case storing if preferences to device store fails", async () => {


      const errorExpected: LaunchPadError = new LaunchPadError("Store Error", ErrorType.preferenceDeviceStore);
      preferenceStore.savePreference.mockRejectedValue(errorExpected);
      const actionExpected: UpdatePreferenceErrorAction = {
        type: updatePreferenceErrorActionType,
        error: errorExpected,
        preference
      };

      await (createUpdatePreferenceAction(preference, preferenceStore)(dispatch, jest.fn(), undefined));
      const actionDispatched = dispatch.mock.calls[0][0];
      expect(actionDispatched).toEqual(actionExpected);
      expectLaunchPadError(actionDispatched.error, ErrorType.preferenceDeviceStore);

    });

  });

});
