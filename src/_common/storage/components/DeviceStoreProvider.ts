import * as React from "react";
import * as PropTypes from "prop-types";
import * as h from "react-hyperscript";
import { DeviceStores } from "../device_store";
import { createSettingsDeviceStores } from "../../../modules/settings/src/_common/device_stores";

export type DeviceStore = {
  get: <Value>(key: string) => Promise<Value>;
  put: <Value>(key: string, value: Value) => Promise<void>;
};

export type DeviceStoreContext = {
  deviceStores: DeviceStores
};

export type DeviceStoreProviderProps = {
  store: DeviceStore
};

export class DeviceStoreProvider extends React.Component<DeviceStoreProviderProps> {


  static childContextTypes = {
    deviceStores: PropTypes.object
  };

  getChildContext(): DeviceStoreContext {
    return {
      deviceStores: {
        store: this.props.store,
        settingsDeviceStores: createSettingsDeviceStores(this.props.store),
      }
    };

  }

  render() {
    return h("div", [this.props.children]);
  }
}
