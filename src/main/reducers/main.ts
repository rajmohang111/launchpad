import { GlobalState, createGlobalInitState, default as globalReducer } from "../../app/reducers/global";
import { combineReducers } from "redux";
import moduleReducer, { createModulesInitState, ModulesState } from "../../app/reducers/modules";

export type RootState = {
  global: GlobalState,
  modules: ModulesState
};
export const createInitRootState = () => ({
  global: createGlobalInitState(),
  modules: createModulesInitState()
});

const rootReducer = combineReducers({
  global: globalReducer,
  modules: moduleReducer
});

export default rootReducer;
