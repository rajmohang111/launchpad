import * as React from "react";
import * as PropTypes from "prop-types";
import * as h from "react-hyperscript";
import { DeviceStoreContext } from "../components/DeviceStoreProvider";

export type InjectedDeviceStoreProps = {
  storeContext: DeviceStoreContext
};

// CAUTION: This only exists as RouterNavigation has some issues with RP based injection
// Please use the Store component in all other cases
export const withDeviceStore = <P>(Component: React.ComponentType<P & InjectedDeviceStoreProps>) =>
  class WithStore extends React.Component<P> {

    static contextTypes = {
      deviceStores: PropTypes.object
    };

    render() {
      return h(Component, { ...this.props as object, storeContext: this.context as DeviceStoreContext });
    }

  };
