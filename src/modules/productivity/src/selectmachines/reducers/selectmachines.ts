import { combineReducers } from "redux";
import {
  SEARCH_MACHINES,
  SearchMachinesAction,
  SelectMachinesActions,
  UPDATE_MACHINE_SELECTION,
  UpdateMachineSelectionAction,
} from "../actions/selectMachines_actions";
import {
  CLOSE_SELECT_MACHINES_VIEW,
  OPEN_SELECT_MACHINES,
  OpenSelectMachinesAction,
  SAVE_SELECTED_MACHINES,
} from "../../_common/actions/actions";

export type ProductivitySelectMachinesState = {
  searchParam: string | null;
  deviceIds: Array<number>;
};

export const createProductivitySelectMachinesInitState = (): ProductivitySelectMachinesState => ({
  searchParam: null,
  deviceIds: [],
});

const initState: ProductivitySelectMachinesState = createProductivitySelectMachinesInitState();

const deviceIds = (state: Array<number> = initState.deviceIds, action: SelectMachinesActions): Array<number> => {
  switch (action.type) {
    case UPDATE_MACHINE_SELECTION:
      const umsAction = action as UpdateMachineSelectionAction;
      const updatedState = new Set(state);
      if (umsAction.machineSelection.selectStatus) {
        updatedState.add(umsAction.machineSelection.id);
      } else {
        updatedState.delete(umsAction.machineSelection.id);
      }
      return Array.from(updatedState);
    case OPEN_SELECT_MACHINES:
      const osmAction = action as OpenSelectMachinesAction;
      return osmAction.deviceIds;
    case CLOSE_SELECT_MACHINES_VIEW:
      return [];
    case SAVE_SELECTED_MACHINES:
      return [];
    default: {
      return state;
    }
  }
};

const searchParam = (state: string | null = null, action: SelectMachinesActions): string | null => {
  switch (action.type) {
    case SEARCH_MACHINES:
      const smAction = action as SearchMachinesAction;
      return smAction.searchParam;
    case SAVE_SELECTED_MACHINES:
      return null;
    case CLOSE_SELECT_MACHINES_VIEW:
      return null;
    default: {
      return state;
    }
  }
};

export const selectMachinesReducer = combineReducers<ProductivitySelectMachinesState>({
  deviceIds,
  searchParam,
});
export default selectMachinesReducer;
