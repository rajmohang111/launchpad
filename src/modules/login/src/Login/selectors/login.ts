import { createSelector, Selector } from "reselect";
import { RootState } from "../../../../../main/reducers/main";
import { LoginState } from "../reducers/login";
import { getModules } from "../../../../../_common/selectors/modules";

export const loginState: Selector<RootState, LoginState> = createSelector(
  [getModules],
  modules => modules.login
);
