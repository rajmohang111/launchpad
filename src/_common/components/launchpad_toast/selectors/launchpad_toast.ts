import { createSelector, Selector } from "reselect";
import { RootState } from "../../../../main/reducers/main";
import { LaunchpadToastState } from "../reducers/launchpad_toast";
import { getGlobalState } from "../../../selectors/global";

export const getLaunchpadToast: Selector<RootState, LaunchpadToastState> = createSelector(
  [getGlobalState],
  global => global.launchpadToast
);
