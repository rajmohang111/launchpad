import { Selector } from "reselect";
import { RootState } from "../../main/reducers/main";
import { ModulesState } from "../../app/reducers/modules";

export const getModules: Selector<RootState, ModulesState> = (state: RootState) => state.modules;
