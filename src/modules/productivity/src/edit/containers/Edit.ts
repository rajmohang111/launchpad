import * as h from "react-hyperscript";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";

import { default as ProductivityEditView, ProductivityEditProps } from "../views/EditView";
import { RootState } from "main/reducers/main";
import {
  getProductivityEditDevice,
  getProductivityEditLoading,
  getProductivityEditSelectedDeviceIds,
} from "../selectors/edit";
import {
  createCloseEditAndNavigateBackAction,
  createNavigateSelectMachinesAction,
  createSaveEditAndNavigateBackAction,
  createUpdateDeviceSettingsAction,
  EditActions,
} from "../actions/edit_actions";
import { ModuleRoutes } from "../../main/models/modules";
import { PassedRestProps, Rest } from "../../../../../_common/rest/components/Rest";
import { bindActionCreators } from "redux";
import { ProductivityRestService } from "../../_common/services/rest";

const ProductivityEdit = (props: ProductivityEditProps) => h(Rest, {
  component: ({ restServices: { productivity: service } }: PassedRestProps) => {
    return h(ProductivityEditView, { ...props, service });
  }
});

const mapState = (state: RootState) => ({
  device: getProductivityEditDevice(state),
  selectedDeviceIds: getProductivityEditSelectedDeviceIds(state),
  loading: getProductivityEditLoading(state)
});

const mapDispatch = (dispatch: ThunkDispatch<RootState, void, EditActions>) => ({
  actions: {
    onNavigateBack: () => dispatch(createCloseEditAndNavigateBackAction()),
    onSave: (service: ProductivityRestService) => dispatch(createSaveEditAndNavigateBackAction(service)),
    onChangeLimits: bindActionCreators(createUpdateDeviceSettingsAction, dispatch),
    onSelectMachines: (deviceIds: Array<number>) => dispatch(createNavigateSelectMachinesAction(deviceIds, ModuleRoutes.selectMachine))
  }
});

export default connect(mapState, mapDispatch)(ProductivityEdit);
