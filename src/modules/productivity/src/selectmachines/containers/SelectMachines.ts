import * as h from "react-hyperscript";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { default as ProductivitySelectMachinesView, ProductivitySelectMachinesProps } from "../views/SelectMachinesView";
import { RootState } from "main/reducers/main";
import { getProductivityOverviewData } from "../../_common/selectors/index";
import {
  SelectMachinesActions,
  createCloseSelectMachinesAndNavigateBackAction,
  createSaveSelectMachinesAndNavigateBackAction,
  createSearchMachinesAction,
  createSelectMachineUpdateAction,
} from "../actions/selectMachines_actions";
import { getProductivitySelectMachinesDeviceIds, getProductivitySelectMachinesSearchParam } from "../selectors/selectmachines";



const ProductivitySelectMachines = (props: ProductivitySelectMachinesProps) => h(ProductivitySelectMachinesView, props);

const mapState = (state: RootState) => ({
  deviceList: getProductivityOverviewData(state),
  deviceIds: getProductivitySelectMachinesDeviceIds(state),
  searchParam: getProductivitySelectMachinesSearchParam(state)
});

const mapDispatch = (dispatch: ThunkDispatch<RootState, void, SelectMachinesActions>) => ({
  actions: {
    onNavigateBack: () => dispatch(createCloseSelectMachinesAndNavigateBackAction()),
    onSave: () => dispatch(createSaveSelectMachinesAndNavigateBackAction()),
    onSearch: (searchParam: string) => dispatch(createSearchMachinesAction(searchParam)),
    onSelect: bindActionCreators(createSelectMachineUpdateAction, dispatch)
  }
});

export default connect(mapState, mapDispatch)(ProductivitySelectMachines);
