import * as React from "react";
import { AppModule } from "../../../models/module";
import { createNavigateToLoginAction, LoginProtectedAction } from "../actions/login_protected";
import * as h from "react-hyperscript";
import FormattedMessage from "../../../i18n/components/Formatted_Message";
import { RootState } from "../../../../main/reducers/main";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { isLoggedIn } from "../../../selectors/settings";

export type LoginProtectedOwnProps = {
  component: React.ComponentType,
  appModule: AppModule
};
export type LoginProtectedProps = LoginProtectedOwnProps & {
  isLoggedIn: boolean,
  actions: {
    doLogin: (appModule: AppModule) => LoginProtectedAction
  }
};

class LoginProtected extends React.Component<LoginProtectedProps> {

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.actions.doLogin(this.props.appModule);
    }
  }

  render() {
    return this.props.isLoggedIn ?
      h(this.props.component):
      h("div", [
        h(FormattedMessage, { id: "loginProtected_redirect_message" })
      ]);
  }

}

const mapStateToProps = (state: RootState, ownProps: LoginProtectedOwnProps) => ({
  ...ownProps,
  isLoggedIn: isLoggedIn(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: {
    doLogin: bindActionCreators(createNavigateToLoginAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginProtected);

