import * as React from "react";
import * as h from "react-hyperscript";
import { css } from "emotion";
import { List, ProgressBar } from "react-onsenui";
import DeviceListEntry from "./DeviceListEntry";
import { Device } from "../../_common/models/device";

const mainStyles = {
  list: css({
    paddingBottom: "0",
  }),
};

export type OverviewActionsProps = {
  displayMetersPerHour: boolean,
  actions: {
    onDeviceSelect: (data: Device) => void,
  }
};

export type OverviewProps = OverviewActionsProps & {
  data: Array<Device>,
  isRunning: boolean
};

const renderRowFun = ({ displayMetersPerHour, actions }: OverviewActionsProps) => (device: Device) =>
  React.createElement(DeviceListEntry, { device, displayMetersPerHour, actions, key: device.id });

const Overview = (props: OverviewProps) =>
  h("div", [
    props.isRunning ? h(ProgressBar, { indeterminate: true }) : null,
    h(List, {
      className: mainStyles.list,
      dataSource: props.data,
      renderRow: renderRowFun(props),
    })
  ]);

export default Overview;
