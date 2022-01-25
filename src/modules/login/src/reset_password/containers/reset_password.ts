import * as h from "react-hyperscript";
import { default as ResetpasswordView, ResetPasswordProps } from "../views/reset_password";
import { PassedRestProps, Rest } from "../../../../../_common/rest/components/Rest";
import { DeviceStore, PassedDeviceStoreProps } from "../../../../../_common/storage/components/DeviceStore";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "main/reducers/main";
import { createNavigateBackAction } from "../../../../../app/actions/routing";
import { ResetPasswordAction } from "../actions/reset_password";
import { resetPassword } from "../thunks/reset_password";

const ResetPassword = (props: ResetPasswordProps) =>
  h(Rest, {
    component: (restContext: PassedRestProps) =>
      h(DeviceStore, {
        component: (deviceStores: PassedDeviceStoreProps) =>
          h(
            ResetpasswordView, {
              ...props,
              accountRestService: restContext.restServices.settings.accountRestService,
              accountDeviceStore: deviceStores.deviceStores.settingsDeviceStores.accountDeviceStores.accountDeviceStore
            }
          )
      })
  });

const mapStateToProps = (state: RootState, ownProps: ResetPasswordProps) => ({
  ...ownProps
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, ResetPasswordAction>) => ({
  actions: {
    onNavigateBack: bindActionCreators(createNavigateBackAction, dispatch),
    onSubmit: bindActionCreators(resetPassword, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
