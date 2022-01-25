import { tutorialState } from "../reducers/tutorial";
import { RootState } from "../../../../../main/reducers/main";

export const getTutorialState = (state: RootState): tutorialState => state.modules.tutorial;