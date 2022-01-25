import * as h from "react-hyperscript";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {default as ProductivityOverview, OverviewProps} from "../views/Overview";
import {RootState} from "../../../../../main/reducers/main";
import {
  createNavigateToDetailsAction,
  OverviewActions
} from "../actions/overview_actions";
import { getProductivityOverviewIsRunning } from "../selectors";
import {getProductivityOverviewData, getProductivityOverviewDisplayMetersPerHour} from "../../_common/selectors";
import {Device} from "../../_common/models/device";

const OverviewContainer = (props: OverviewProps) => h(ProductivityOverview, props);

const mapState = (state: RootState) => ({
  displayMetersPerHour: getProductivityOverviewDisplayMetersPerHour(state),
  isRunning: getProductivityOverviewIsRunning(state),
  data: getProductivityOverviewData(state),
});

const mapDispatch = (dispatch: ThunkDispatch<RootState, void, OverviewActions>) => ({
  actions: {
    onDeviceSelect: (data: Device) => dispatch(createNavigateToDetailsAction(data)),
  }
});

export default connect(mapState, mapDispatch)(OverviewContainer);
