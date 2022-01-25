import { LaunchPadActions } from "../actions/launchpad";

export type LaunchPadState = {};

export const createLaunchPadInitState = (): LaunchPadState => ({});

const launchPadReducer = (state = createLaunchPadInitState(), action: LaunchPadActions) => state;
export default launchPadReducer;
