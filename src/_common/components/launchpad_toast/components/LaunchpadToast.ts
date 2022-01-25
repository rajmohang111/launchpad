import * as h from "react-hyperscript";
import LaunchpadToastView, { LaunchpadToastViewProps } from "../views/LaunchpadToast";
import { RootState } from "../../../../main/reducers/main";
import { bindActionCreators, Dispatch } from "redux";
import { createHideLaunchpadToastAction } from "../actions/launchpad_toast";
import { connect } from "react-redux";
import { getLaunchpadToast } from "../selectors/launchpad_toast";

export type LaunchpadToastProps = LaunchpadToastViewProps;

const LaunchpadToast = (props: LaunchpadToastProps) =>
  h(LaunchpadToastView, props);

const mapStateToProps = (state: RootState) => ({
  launchpadToastState: getLaunchpadToast(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    onHideLaunchpadToast: bindActionCreators(createHideLaunchpadToastAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LaunchpadToast);


