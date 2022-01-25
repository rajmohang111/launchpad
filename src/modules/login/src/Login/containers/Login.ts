import * as h from "react-hyperscript";
import { default as LoginView, LoginViewActions } from "../views/Login";
import { PassedRestProps, Rest } from "../../../../../_common/rest/components/Rest";
import { AppModule } from "../../../../../_common/models/module";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { createLoginAction, createNavigateToRegistration, LoginAction, createResetPasswordAction } from "../actions/login";
import { bindActionCreators } from "redux";
import { createNavigateBackAction } from "../../../../../app/actions/routing";
import { connect } from "react-redux";
import { DeviceStore, PassedDeviceStoreProps } from "../../../../../_common/storage/components/DeviceStore";
import { LoginState } from "../reducers/login";
import { loginState } from "../selectors/login";
import { createUpdateLoginRegionAction } from "../../../../system/src/_actions/login";

export type LoginOwnProps = {
  redirectModule: AppModule
};
export type LoginProps = LoginOwnProps & {
  loginState: LoginState,
  actions: LoginViewActions
};

const Login = (props: LoginProps) =>

  h(Rest, {
    component: (restContext: PassedRestProps) =>
      h(DeviceStore, {
        component: (deviceStoreContext: PassedDeviceStoreProps) =>
          h(
            LoginView,
            {
              accountRestService: restContext.restServices.settings.accountRestService,
              accountDeviceStore: deviceStoreContext.deviceStores.settingsDeviceStores.accountDeviceStores.accountDeviceStore,
              ...props
            }
          )
      })
  });

const mapStateToProps = (state: RootState, ownProps: LoginOwnProps) => ({
  ...ownProps,
  loginState: loginState(state),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, LoginAction>) => ({
  actions: {
    onNavigateBack: bindActionCreators(createNavigateBackAction, dispatch),
    onLogin: bindActionCreators(createLoginAction, dispatch),
    onAccountRegister: bindActionCreators(createNavigateToRegistration, dispatch),
    onRegionChange: bindActionCreators(createUpdateLoginRegionAction, dispatch),
    onResetPassword: bindActionCreators(createResetPasswordAction, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
