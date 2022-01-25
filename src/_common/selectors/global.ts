import { GlobalState } from "../../app/reducers/global";
import { RootState } from "../../main/reducers/main";

export const getGlobalState = (state: RootState): GlobalState => state.global;

