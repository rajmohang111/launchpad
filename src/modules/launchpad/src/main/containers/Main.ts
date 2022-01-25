import { default as MainView, LaunchPadProps as LaunchPadProps } from "../views/Main";
import { RootState } from "../../../../../main/reducers/main";
import * as h from "react-hyperscript";
import { connect } from "react-redux";
import { getLaunchPadState } from "../selectors/launchpad";
import { bindActionCreators, Dispatch } from "redux";
import { createModuleSelectionAction } from "../actions/launchpad";
import { isLoggedIn } from "../../../../../_common/selectors/settings";

export type LaunchProps = LaunchPadProps;

const Main = (props: LaunchProps) =>
  h(MainView, props);

const mapStateToProps = (state: RootState) => ({
  launchState: getLaunchPadState(state),
  isLoggedIn: isLoggedIn(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    onModuleSelectAction: bindActionCreators(
      createModuleSelectionAction,
      dispatch
    )
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
