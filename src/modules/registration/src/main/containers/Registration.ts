import {default as MainView, RegistrationViewActions} from "../views/Registration";
import * as h from "react-hyperscript";
import {connect} from "react-redux";
import * as thunks from "../thunks/registration";
import {RegistrationAction} from "../actions/registration";
import {bindActionCreators} from "redux";
import {createNavigateBackAction} from "../../../../../app/actions/routing";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../../../../main/reducers/main";
import {PassedRestProps, Rest} from "../../../../../_common/rest/components/Rest";
import {
  DeviceStore,
  PassedDeviceStoreProps
} from "../../../../../_common/storage/components/DeviceStore";
import {getRegistrationRequestPending} from "../selectors/registration";
import {createUpdateRegistrationRegionAction} from "../../../../system/src/_actions/registration";

export type RegistrationProps = {
  requestPending: boolean,
  actions: RegistrationViewActions
};

const Registration = (props: RegistrationProps) =>
  h(Rest, {
    component: (restContext: PassedRestProps) =>
      h(DeviceStore, {
        component: (deviceStores: PassedDeviceStoreProps) =>
          h(MainView, {
            ...props,
            accountRestService: restContext.restServices.settings.accountRestService,
            accountDeviceStore: deviceStores.deviceStores.settingsDeviceStores.accountDeviceStores.accountDeviceStore,
          })
      })
  });

type MapStateToProps = Pick<RegistrationProps, "requestPending">;
const mapStateToProps = (state: RootState) => ({
  requestPending: getRegistrationRequestPending(state)
});

type MapDispatchToProps = Pick<RegistrationProps, "actions">;
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, RegistrationAction>) => ({
  actions: {
    onNavigateBack: bindActionCreators(createNavigateBackAction, dispatch),
    onSubmitAccountDetails: bindActionCreators(thunks.createAccountAction, dispatch),
    onRegionChange: bindActionCreators(createUpdateRegistrationRegionAction, dispatch),
  }
});

export default connect<MapStateToProps, MapDispatchToProps>(mapStateToProps, mapDispatchToProps)(Registration);
