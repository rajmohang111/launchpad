import { PreferencesState } from "../reducers/preferences";
import { RootState } from "../../../../../main/reducers/main";

export const getPreferencesState = (state: RootState): PreferencesState => state.modules.settings.preferences;
