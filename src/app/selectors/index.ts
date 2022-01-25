import { createSelector, Selector } from "reselect";
import { GlobalState } from "../reducers/global";
import { RootState } from "../../main/reducers/main";
import { ModulesState } from "../reducers/modules";
import { RouterState } from "../reducers/routing";

export const getGlobal: Selector<RootState, GlobalState> = (state: RootState) => state.global;

export const getModules: Selector<RootState, ModulesState> = (state: RootState) => state.modules;

export const getRouting: Selector<RootState, RouterState> = createSelector(
  [getGlobal],
  global => global.routing
);
