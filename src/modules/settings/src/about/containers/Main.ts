import * as h from "react-hyperscript";
import MainView, { AboutProps } from "../views/Main";
import { bindActionCreators, Dispatch } from "redux";
import { createNavigateBackAction } from "../../../../../app/actions/routing";
import { connect } from "react-redux";

const Main = (props: AboutProps) => (
  h(MainView, props)
);

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch): Pick<AboutProps, "actions"> => ({
  actions: {
    onNavigateBack: bindActionCreators(createNavigateBackAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
