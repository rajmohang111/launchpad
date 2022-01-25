import { combineReducers } from "redux";
import { createTranslationsInitState, default as translationReducer, TranslationsState } from "./translations";
import routingReducer, { createRouterInitState, RouterState } from "./routing";
import { createSystemInitState, systemReducer, SystemState } from "./system";
import launchpadToastReducer, { createLaunchpadToastInitState, LaunchpadToastState } from "../../_common/components/launchpad_toast/reducers/launchpad_toast";

export type GlobalState = {
  translations: TranslationsState,
  routing: RouterState,
  system: SystemState,
  launchpadToast: LaunchpadToastState
};

export const createGlobalInitState = (): GlobalState => ({
  translations: createTranslationsInitState(),
  routing: createRouterInitState(),
  system: createSystemInitState(),
  launchpadToast: createLaunchpadToastInitState()
});

const globalReducer = combineReducers<GlobalState>({
  translations: translationReducer,
  routing: routingReducer,
  system: systemReducer,
  launchpadToast: launchpadToastReducer
});

export default globalReducer;
