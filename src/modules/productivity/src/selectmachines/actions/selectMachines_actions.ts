import { Action, Dispatch } from "redux";
import { createNavigateBackAction, NavigateBackAction } from "../../../../../app/actions/routing";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import {
  createSaveSelectMachineViewAction,
  createCloseSelectMachineViewAction
} from "../../_common/actions/actions";
import { getProductivitySelectMachinesDeviceIds } from "../selectors/selectmachines";

export const SEARCH_MACHINES = "SEARCH_MACHINES";
export const UPDATE_MACHINE_SELECTION = "UPDATE_MACHINE_SELECTION";
export const UPDATE_SEARCH_PARAMS = "UPDATE_SEARCH_PARAMS";

export interface SearchMachinesAction extends Action {
  searchParam: string;
}

export interface UpdateMachineSelectionAction extends Action {
  machineSelection: {
    selectStatus: boolean;
    id: number;
  };
}

export type SelectMachinesActions =
  Action |
  NavigateBackAction |
  SearchMachinesAction |
  UpdateMachineSelectionAction;

export const createCloseSelectMachinesAndNavigateBackAction = (): ThunkAction<void, RootState, void, SelectMachinesActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(createCloseSelectMachineViewAction());
    dispatch(createNavigateBackAction());
  };

export const createSaveSelectMachinesAndNavigateBackAction = (): ThunkAction<void, RootState, void, SelectMachinesActions> =>
  async (dispatch: Dispatch, getState): Promise<void> => {
    dispatch(createSaveSelectMachineViewAction(getProductivitySelectMachinesDeviceIds(getState())));
    dispatch(createNavigateBackAction());
  };

export const createSearchMachinesAction = (searchParam: string): ThunkAction<void, RootState, void, SelectMachinesActions> =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch({
      type: SEARCH_MACHINES,
      searchParam
    });
  };

export const createSelectMachineUpdateAction = (selectStatus: boolean, id: number): UpdateMachineSelectionAction => ({
  type: UPDATE_MACHINE_SELECTION,
  machineSelection: { selectStatus, id }
});
