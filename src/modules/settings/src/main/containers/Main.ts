import * as h from "react-hyperscript";
import { default as MainView, SettingsProps } from "../views/Main";
import { RootState } from "../../../../../main/reducers/main";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { createSelectAccountModuleAction, createSettingsSelectionAction } from "../actions/settings";
import { createNavigateBackAction } from "../../../../../app/actions/routing";
import { isLoggedIn } from "../../../../../_common/selectors/settings";

const Main = (props: SettingsProps) =>
  h(MainView, props);

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: isLoggedIn(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    onSettingsSelectAction: bindActionCreators(
      createSettingsSelectionAction,
      dispatch
    ),
    onAccountSelectAction: bindActionCreators(createSelectAccountModuleAction, dispatch),
    onNavigateBack: bindActionCreators(createNavigateBackAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
