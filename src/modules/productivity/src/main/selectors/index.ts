import {createSelector, Selector} from "reselect";
import {RootState} from "../../../../../main/reducers/main";
import {ModulesState} from "../../../../../app/reducers/modules";
import {ProductivityState} from "../reducers";
import {getModules} from "../../../../../app/selectors";

export const getProductivity: Selector<RootState, ProductivityState | undefined> = createSelector(
  [getModules],
  (modules: ModulesState | undefined) => {
    if (modules && modules !== null) {
      return modules.productivity;
    }
    return undefined;
  }
);
