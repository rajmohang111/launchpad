import { Component } from "react";
import * as h from "react-hyperscript";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { default as ProductivityView, ProductivityProps } from "../views/Productivity";
import { RootState } from "../../../../../main/reducers/main";
import { createNavigateBackAction } from "../../../../../app/actions/routing";
import { PassedRestProps, Rest } from "../../../../../_common/rest/components/Rest";
import { ProductivityRestService } from "../../_common/services/rest";
import { ThunkDispatch } from "redux-thunk";
import { createFetchDataAction, ProductivityActions } from "../actions/productivity_actions";
import { getProductivityOverviewShouldLoadDevices } from "../../overview/selectors";
import LoginProtected from "../../../../../_common/components/loginProtected/components/LoginProtected";
import { AppModule } from "../../../../../_common/models/module";
import { interval, Subscription } from "rxjs";
import { getAccountCredential } from "../../../../../_common/selectors/settings";
import { calculatePollingIntervalInMilliseconds } from "../constants/polling";
import { Credential } from "../../../../../_common/rest/models/rest";
import { createOverviewSwitchDataDisplayAction } from "../../_common/actions/actions";
import { getProductivityOverviewDisplayMetersPerHour } from "../../_common/selectors";
import { getGlobalState } from "../../../../../_common/selectors/global";
import { takeWhile } from "rxjs/operators";

export type ProductivityContainerProps = ProductivityProps & {
  shouldLoadDevices: boolean,
  credential: Credential,
  displayMetersPerHour: boolean,
  isAppPaused: boolean
};

class Productivity extends Component<ProductivityContainerProps> {

  private devicesPoller: Subscription;

  private setupDevicePolling() {
    this.devicesPoller = interval(calculatePollingIntervalInMilliseconds(process.env.DEVICE_POLLING_INTERVAL)).pipe(
      takeWhile(() => !this.props.isAppPaused)
    ).subscribe(
      () => this.props.actions.fetchData(() => { }, this.props.service)
    );
  }

  private fetchData() {
    const { actions, service } = this.props;
    if (this.props.shouldLoadDevices) {
      actions.fetchData(() => { }, service);
    }
  }

  componentDidMount() {
    this.fetchData();
    this.setupDevicePolling();
  }

  componentDidUpdate(): void {
    this.fetchData();
  }

  componentWillUnmount(): void {
    if (this.devicesPoller) {
      this.devicesPoller.unsubscribe();
    }
  }

  render() {
    const { displayMetersPerHour, actions, service } = this.props;
    return h(ProductivityView, { displayMetersPerHour, actions, service });
  }
}

const Container = (props: ProductivityContainerProps) => h(Rest, {
  component: ({ restServices: { productivity: service } }: PassedRestProps) => {
    return h(Productivity, { ...props, service });
  }
});

const mapState = (state: RootState) => ({
  credential: getAccountCredential(state),
  shouldLoadDevices: getProductivityOverviewShouldLoadDevices(state),
  displayMetersPerHour: getProductivityOverviewDisplayMetersPerHour(state),
  isAppPaused: getGlobalState(state).system.isAppPaused
});

const mapDispatch = (dispatch: ThunkDispatch<RootState, void, ProductivityActions>) => ({
  actions: {
    onNavigateBack: bindActionCreators(createNavigateBackAction, dispatch),
    fetchData: (done: () => void, service: ProductivityRestService) =>
      dispatch(createFetchDataAction(done, service)),
    onSwitcherChange: bindActionCreators(createOverviewSwitchDataDisplayAction, dispatch),
  }
});

const ConnectedContainer = connect(mapState, mapDispatch)(Container);
const ProtectedContainer = () =>
  h(LoginProtected, { appModule: AppModule.productivity, component: ConnectedContainer });

export default ProtectedContainer;
