import * as React from "react";
import * as h from "react-hyperscript";
import { Page, RouteConfig } from "react-onsenui";
import Router, { RouterActions } from "./Router";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../main/reducers/main";
import { AppAction } from "../actions/bootstrap";
import { DeviceStores } from "../../_common/storage/device_store";
import { DeviceStoreContext } from "../../_common/storage/components/DeviceStoreProvider";
import { withDeviceStore } from "../../_common/storage/hocs/device_store";
import LaunchpadToast from "../../_common/components/launchpad_toast/components/LaunchpadToast";
import { AppStateAction } from "app/actions/appstate";

export type AppActions = RouterActions & {
  bootstrap: (stores: DeviceStores) => ThunkAction<void, RootState, void, AppAction>;
  updateAppState: (appState: boolean) => AppStateAction
};
export type AppProps = {
  isBootstrapped: boolean,
  routeConfig: RouteConfig;
  storeContext: DeviceStoreContext;
  actions: AppActions
};


const renderPage = (routeConfig: RouteConfig, actions: AppActions) =>
  h(Page, [
    h(Router, { routeConfig, actions }),
    h(LaunchpadToast)
  ]);

class App extends React.Component<AppProps> {

  constructor(props: AppProps) {
    super(props);
    this.bootStrapApp();
  }

  bootStrapApp() {
    document.addEventListener("pause", this.onPause.bind(this), false);
    document.addEventListener("resume", this.onResume.bind(this), false);
    if (!this.props.isBootstrapped) {
      this.props.actions.bootstrap(this.props.storeContext.deviceStores);
    }
  }

  onPause() {
    this.props.actions.updateAppState(true);
  }

  onResume() {
    this.props.actions.updateAppState(false);
  }

  render() {
    return renderPage(this.props.routeConfig, this.props.actions);
  }

}

export default withDeviceStore(App);
