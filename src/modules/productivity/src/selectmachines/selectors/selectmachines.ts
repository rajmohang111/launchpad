import { createSelector } from "reselect";
import { ProductivityState } from "../../main/reducers";
import { getProductivity } from "../../main/selectors";
import { ProductivitySelectMachinesState } from "../reducers/selectmachines";
import { RootState } from "main/reducers/main";

export const getProductivitySelectMachines = createSelector<RootState, ProductivityState | undefined, ProductivitySelectMachinesState | undefined>(
  [getProductivity],
  (productivity: ProductivityState) => {
    if (productivity && null !== productivity) {
      return productivity.selectMachines;
    }
    return undefined;
  }
);

export const getProductivitySelectMachinesDeviceIds = createSelector<RootState, ProductivitySelectMachinesState | undefined, Array<number>>(
  [getProductivitySelectMachines],
  (selectMachines: ProductivitySelectMachinesState) => {
    if (selectMachines && selectMachines !== null) {
      return selectMachines.deviceIds;
    }
    return [];
  }
);

export const getProductivitySelectMachinesSearchParam = createSelector<RootState, ProductivitySelectMachinesState | undefined, string | null>(
  [getProductivitySelectMachines],
  (selectMachines: ProductivitySelectMachinesState) => {
    if (selectMachines && selectMachines !== null) {
      return selectMachines.searchParam;
    }
    return null;
  }
);
