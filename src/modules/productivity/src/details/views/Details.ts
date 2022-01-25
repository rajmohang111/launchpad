import * as h from "react-hyperscript";
import { Component } from "react";
import { Page } from "react-onsenui";
import { completeToolbarCreator, createToolbarNavigationElement } from "../../../../../_common/toolbar/factory";
import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import {
  productivityDetailsModuleName,
  productivityEditModuleName
} from "../../../../../_common/i18n/message/translations";
import { Device } from "../../_common/models/device";
import DetailsHeader from "./DetailsHeader";
import DetailsOutputData from "./DetailsOutputData";
import DetailsSwitch from "./DetailsSwitch";
import DetailsChart from "./DetailsChart";
import LaunchpadToast from "../../../../../_common/components/launchpad_toast/components/LaunchpadToast";
import { MeasurementGroup } from "../../_common/models/measurements";
import { DEVICE_ORIENTATION, readDeviceOrientation } from "../../../../../_common/models/device_orientation";
import { css } from "emotion";
import { colors } from "../../../../../_common/styles/global";

export type ProductivityDetailsActions = ToolbarActions & {
  onEditDetails: () => void,
  onSwitchToggle: (toogle: boolean) => void,
  onUpdateDeviceOrientation: (orientation: DEVICE_ORIENTATION) => void,
};

export type ProductivityDetailsViewProps = {
  device: Device,
  displayMetersPerHour: boolean,
  measurementGroups: ReadonlyArray<MeasurementGroup>,
  orientation: DEVICE_ORIENTATION,
  actions: ProductivityDetailsActions,
};

const styles = {
  switchContainer: css({
    display: "flex",
    flex: "1 1 100%",
    justifyContent: "center",
    padding: "11.3px 16px",
    borderBottom: `1px solid ${colors.veryLightGrey}`
  }),
  outputData: css({
    padding: "7.5px 16px 16px 16px",
    borderBottom: `1px solid ${colors.veryLightGrey}`,
  }),
  backgroundWhite: css({
    backgroundColor: colors.white,
    height: "100%"
  }),
  chartLandscape: css({
    height: "50vh"
  }),
  chartPortrait: css({
    height: "25vh"
  })
};

export class ProductivityDetails extends Component<ProductivityDetailsViewProps> {

  constructor(props: ProductivityDetailsViewProps) {
    super(props);

    this.onDeviceOrientationUpdate = this.onDeviceOrientationUpdate.bind(this);
  }

  onDeviceOrientationUpdate() {
    const { actions } = this.props;
    const orientation = readDeviceOrientation(window);
    actions.onUpdateDeviceOrientation(orientation);
  }

  componentDidMount() {
    window.addEventListener("orientationchange", this.onDeviceOrientationUpdate);
    window.onorientationchange = this.onDeviceOrientationUpdate;
  }

  componentWillUnmount() {
    window.removeEventListener("orientationchange", this.onDeviceOrientationUpdate);
    window.onorientationchange = null;
  }

  render() {
    const { device, displayMetersPerHour, orientation, measurementGroups, actions } = this.props;
    return h(Page, {
      renderToolbar: completeToolbarCreator(
        productivityDetailsModuleName,
        createToolbarNavigationElement(actions.onNavigateBack),
        createToolbarNavigationElement(actions.onEditDetails, productivityEditModuleName)
      )
    }, [
        h("div", { className: styles.backgroundWhite }, [
          h(DetailsHeader, { device, displayMetersPerHour, orientation, actions }),
          orientation === DEVICE_ORIENTATION.PORTRAIT ? h(DetailsOutputData, { className: styles.outputData, device, orientation }) : null,
          orientation === DEVICE_ORIENTATION.PORTRAIT ? h(DetailsSwitch, {
            className: styles.switchContainer,
            displayMetersPerHour,
            actions
          }) : null,
          h(DetailsChart, {
            device, displayMetersPerHour, measurementGroups,
            height: orientation === DEVICE_ORIENTATION.PORTRAIT ? styles.chartPortrait : styles.chartLandscape
          }),
          h(LaunchpadToast),
        ])
      ]);
  }

}

export default ProductivityDetails;
