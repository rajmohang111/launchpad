import { Action, Dispatch } from "redux";
import { createUpdateTranslationAction } from "../../../../../app/actions/translation";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { PreferenceDeviceStore } from "../services/device_store";
import { LaunchPadErrorAction } from "../../../../../app/actions/error";
import { LaunchPadError } from "../../../../../_common/error/error";
import { Preference } from "../../../../../_common/models/settings";
import { Locale } from "../../../../../_common/i18n/IntlProvider";

export type UpdatePreferenceSuccessAction = Action & {
  preference: Preference
};

export type UpdatePreferenceErrorAction = LaunchPadErrorAction & {
  preference: Preference
};

export type PreferencesActions =
  UpdatePreferenceSuccessAction |
  UpdatePreferenceErrorAction;

export const updatePreferenceSuccessActionType = "PREFERENCE_UPDATE_SUCCESS";
export const updatePreferenceErrorActionType = "PREFERENCE_UPDATE_ERROR";

export const createUpdatePreferenceAction = (preference: Preference, preferenceDeviceStore: PreferenceDeviceStore): ThunkAction<void, RootState, void, PreferencesActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      await preferenceDeviceStore.savePreference(preference);
      dispatch(createUpdatePreferenceSuccessAction(preference));
      dispatch(createUpdateTranslationAction(Locale[preference.language]));
    } catch (e) {
      dispatch(createUpdatePreferenceErrorAction(e, preference));
    }
  };

export const createUpdatePreferenceSuccessAction = (preference: Preference): UpdatePreferenceSuccessAction => ({
  type: updatePreferenceSuccessActionType,
  preference
});

export const createUpdatePreferenceErrorAction = (e: LaunchPadError, preference: Preference): UpdatePreferenceErrorAction => ({
  type: updatePreferenceErrorActionType,
  error: e,
  preference
});
