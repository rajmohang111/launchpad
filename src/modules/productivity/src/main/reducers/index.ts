import {combineReducers} from "redux";
import {ProductivityOverviewState, createProductivityOverviewInitState, overviewReducer} from "../../overview/reducers/overview";
import {ProductivityDetailsState, createProductivityDetailsInitState, detailsReducer} from "../../details/reducers/details";
import { createProductivityEditInitState, ProductivityEditState, editReducer } from "../../edit/reducers/edit";
import { createProductivitySelectMachinesInitState, ProductivitySelectMachinesState, selectMachinesReducer } from "../../selectmachines/reducers/selectmachines";

export type ProductivityState = {
  overview: ProductivityOverviewState;
  details: ProductivityDetailsState;
  edit: ProductivityEditState;
  selectMachines: ProductivitySelectMachinesState;
};

export const createProductivityInitState = (): ProductivityState => ({
  overview: createProductivityOverviewInitState(),
  details: createProductivityDetailsInitState(),
  edit: createProductivityEditInitState(),
  selectMachines: createProductivitySelectMachinesInitState()
});

export default combineReducers({
  overview: overviewReducer,
  details: detailsReducer,
  edit: editReducer,
  selectMachines: selectMachinesReducer
});
