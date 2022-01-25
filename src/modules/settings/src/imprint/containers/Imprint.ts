import * as h from "react-hyperscript";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import ImprintView, { ImprintViewProps } from "../views/ImprintView";
import { createNavigateBackAction } from "../../../../../app/actions/routing";

const Imprint = (props: ImprintViewProps) => (
  h(ImprintView, props)
);

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch): Pick<ImprintViewProps, "actions"> => ({
  actions: {
    onNavigateBack: bindActionCreators(createNavigateBackAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Imprint);
