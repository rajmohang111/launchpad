import { LaunchPadState } from "../reducers/launchpad";
import { RootState } from "../../../../../main/reducers/main";

export const getLaunchPadState = (state: RootState): LaunchPadState => state.modules.launchPad;
