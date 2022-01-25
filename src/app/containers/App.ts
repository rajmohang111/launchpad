import { AppProps as AppViewProps, default as AppView } from "../views/App";
import { RootState } from "../../main/reducers/main";
import * as h from "react-hyperscript";
import { connect } from "react-redux";
import { getGlobalState } from "../../_common/selectors/global";
import { bindActionCreators } from "redux";
import { createPostNavigateBackAction, createPostNavigateForwardAction } from "../actions/routing";
import { DeviceStoreProvider } from "../../_common/storage/components/DeviceStoreProvider";
import { createLocalStore } from "../../_common/storage/local_store";
import { AppAction, createBootstrapAction } from "../actions/bootstrap";
import { DeviceStores } from "../../_common/storage/device_store";
import { ThunkDispatch } from "redux-thunk";
import InjectIntRedux from "./InjectIntRedux";
import { RestProvider } from "../../_common/rest/components/RestProvider";
import * as fetch from "isomorphic-fetch";
import { createUpdateAppStateAction } from "../../app/actions/appstate";

export type AppProps = AppViewProps;

const App = (props: AppProps) =>
  h(InjectIntRedux, [
    h(DeviceStoreProvider, { store: createLocalStore(window.localStorage) }, [
      h(RestProvider, { fetch: { fetch } }, [
        h(AppView, props)
      ])
    ])
  ]);


const mapStateToProps = (state: RootState) => ({
  routeConfig: getGlobalState(state).routing.routeConfig,
  isBootstrapped: getGlobalState(state).system.isBootstrapped
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AppAction>) => ({
  actions: {
    onPostPush: bindActionCreators(createPostNavigateForwardAction, dispatch),
    onPostPop: bindActionCreators(createPostNavigateBackAction, dispatch),
    bootstrap: (stores: DeviceStores) => dispatch(createBootstrapAction(stores)),
    updateAppState: bindActionCreators(createUpdateAppStateAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
