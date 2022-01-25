import {
  PreferencesActions,
  UpdatePreferenceSuccessAction,
  updatePreferenceSuccessActionType
} from "../actions/preferences";
import { BootstrapAction, bootstrapActionType } from "../../../../../app/actions/bootstrap";
import { Language, Preference } from "../../../../../_common/models/settings";

export type PreferencesState = Preference;

export const createPreferencesStateInitState = (): PreferencesState => ({
  language: Language.en,
  hideTutorial: true
});

const preferencesReducer = (state = createPreferencesStateInitState(), action: PreferencesActions | BootstrapAction) => {
  switch (action.type) {
    case bootstrapActionType:
      const bootstrapAction = action as BootstrapAction;
      return bootstrapAction.deviceStore.settings.preference;
    case updatePreferenceSuccessActionType:
      const updatePreferenceSuccessAction = action as UpdatePreferenceSuccessAction;
      return {
        ...state,
        ...updatePreferenceSuccessAction.preference
      };
    default:
      return state;
  }
};
export default preferencesReducer;
