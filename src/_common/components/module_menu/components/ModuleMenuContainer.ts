import ModuleMenuView, { ModuleMenuViewProps } from "../views/open_menu/ModuleMenuView";
import * as h from "react-hyperscript";
import { RootState } from "../../../../main/reducers/main";
import { isLoggedIn } from "../../../selectors/settings";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { createNavigateToHomeAction, createNavigateToModuleAction } from "../actions/module_menu";
import { getAppModuleFromRouteConfig } from "../../../services/routing";
import { getRouteConfig } from "../../../selectors/routing";

export type ModuleMenuProps = ModuleMenuViewProps;

const ModuleMenuContainer = (props: ModuleMenuProps) =>
  h(ModuleMenuView, props);

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: isLoggedIn(state),
  selectedModule: getAppModuleFromRouteConfig(getRouteConfig(state))
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    onHomeSelect: bindActionCreators(createNavigateToHomeAction, dispatch),
    onModuleSelect: bindActionCreators(createNavigateToModuleAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModuleMenuContainer);
