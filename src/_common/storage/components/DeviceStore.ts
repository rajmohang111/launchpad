import * as PropTypes from "prop-types";
import * as React from "react";
import { ReactElement } from "react";
import { DeviceStoreContext } from "./DeviceStoreProvider";


export type PassedDeviceStoreProps = DeviceStoreContext;

type RenderFunction = (props: PassedDeviceStoreProps) => ReactElement<any>;
export type DeviceStoreProps = {
  component: RenderFunction
};

export class DeviceStore extends React.Component<DeviceStoreProps> {

  static contextTypes = {
    deviceStores: PropTypes.object
  };

  render() {
    return this.props.component(this.context);
  }


}
