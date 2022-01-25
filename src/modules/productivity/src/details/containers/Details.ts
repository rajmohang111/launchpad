import * as h from "react-hyperscript";
import { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import ProductivityDetailsView, { ProductivityDetailsViewProps } from "../views/Details";
import { RootState } from "../../../../../main/reducers/main";
import {
  createCloseDetailsAndNavigateBackAction,
  createNavigateEditAction,
  createShouldFetchDeviceMeasurementsAction,
  createToggleDetailsSwitchAction,
  createUpdateDeviceOrientationAction,
  DetailsActions
} from "../actions/details_actions";
import {
  getProductivityDetailsData,
  getProductivityDetailsDeviceOrientation,
  getProductivityDetailsDisplayMetersPerHour,
  getProductivityDetailsIsRunning,
  getProductivityDetailsMeasurementGroups,
  getProductivityDetailsShouldLoadMeasurements,
} from "../selectors";
import { ModuleRoutes } from "../../main/models/modules";
import { Device } from "../../_common/models/device";
import { PassedRestProps, Rest } from "../../../../../_common/rest/components/Rest";
import { ProductivityRestService } from "../../_common/services/rest";
import { bindActionCreators } from "redux";
import { MeasurementGroup } from "../../_common/models/measurements";
import { DEVICE_ORIENTATION, readDeviceOrientation } from "../../../../../_common/models/device_orientation";

export type ProductivityDetailsProps = ProductivityDetailsViewProps & {
  isRunning: boolean,
  shouldLoadMeasurements: boolean,
  service: ProductivityRestService,
  actions: {
    fetchMeasurements: (device: Device, service: ProductivityRestService) => void,
  }
};

class ProductivityDetails extends Component<ProductivityDetailsProps, {}> {
  componentDidMount() {
    const {device, isRunning, shouldLoadMeasurements, service, actions} = this.props;
    if (shouldLoadMeasurements && !isRunning) {
      actions.fetchMeasurements(device, service);
    }
    actions.onUpdateDeviceOrientation(readDeviceOrientation(window));
  }

  render() {
    const {device, displayMetersPerHour, orientation, measurementGroups, actions} = this.props;
    return h(ProductivityDetailsView, { device, displayMetersPerHour, orientation, measurementGroups, actions, });
  }
}

const Container = (props: ProductivityDetailsProps) => h(Rest, {
  component: ({ restServices: { productivity: service } }: PassedRestProps) => {
    return h(ProductivityDetails, { ...props, service });
  }
});

type MapStateProps = {
  device: Device | null,
  displayMetersPerHour: boolean,
  isRunning: boolean,
  shouldLoadMeasurements: boolean,
  measurementGroups: ReadonlyArray<MeasurementGroup>,
};
const mapState = (state: RootState) => ({
  device: getProductivityDetailsData(state),
  displayMetersPerHour: getProductivityDetailsDisplayMetersPerHour(state),
  isRunning: getProductivityDetailsIsRunning(state),
  shouldLoadMeasurements: getProductivityDetailsShouldLoadMeasurements(state),
  measurementGroups: getProductivityDetailsMeasurementGroups(state),
  orientation: getProductivityDetailsDeviceOrientation(state),
});

type MapDispatchProps = {
  actions: {
    fetchMeasurements: (device: Device, service: ProductivityRestService) => void,
    onNavigateBack: () => void,
    onEditDetails: () => void,
    onSwitchToggle: (toogle: boolean) => void,
    onUpdateDeviceOrientation: (orientation: DEVICE_ORIENTATION) => void,
  }
};
const mapDispatch = (dispatch: ThunkDispatch<RootState, void, DetailsActions>) => ({
  actions: {
    fetchMeasurements: bindActionCreators(createShouldFetchDeviceMeasurementsAction, dispatch),
    onNavigateBack: bindActionCreators(createCloseDetailsAndNavigateBackAction, dispatch),
    onEditDetails: () => dispatch(createNavigateEditAction(ModuleRoutes.edit)),
    onSwitchToggle: (toogle: boolean) => dispatch(createToggleDetailsSwitchAction(toogle)),
    onUpdateDeviceOrientation: bindActionCreators(createUpdateDeviceOrientationAction, dispatch),
  }
});

export default connect<MapStateProps, MapDispatchProps, {}>(mapState, mapDispatch)(Container);
