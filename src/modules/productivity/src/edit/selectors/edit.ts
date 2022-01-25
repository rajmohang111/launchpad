import { createSelector } from "reselect";
import { ProductivityState } from "../../main/reducers";
import { getProductivity } from "../../main/selectors";
import { ProductivityEditState } from "../reducers/edit";
import { RootState } from "../../../../../main/reducers/main";
import { Device } from "../../_common/models/device";

export const getProductivityEdit = createSelector<RootState, ProductivityState | undefined, ProductivityEditState | undefined>(
  [getProductivity],
  (productivity: ProductivityState) => {
    if (productivity && null !== productivity) {
      return productivity.edit;
    }
    return undefined;
  }
);

export const getProductivityEditDevice = createSelector<RootState, ProductivityEditState | undefined, Device | null>(
  [getProductivityEdit],
  (edit: ProductivityEditState) => {
    if (edit && edit !== null) {
      return edit.device;
    }
    return null;
  }
);

export const getProductivityEditSelectedDeviceIds = createSelector<RootState, ProductivityEditState | undefined, Array<number>>(
  [getProductivityEdit],
  (edit: ProductivityEditState) => {
    if (edit && edit !== null) {
      return edit.selectedDeviceIds;
    }
    return [];
  }
);

export const getProductivityEditLoading = createSelector<RootState, ProductivityEditState | undefined, boolean>(
  [getProductivityEdit],
  (edit: ProductivityEditState) => {
    if (edit && edit !== null) {
      return edit.loading;
    }
    return false;
  }
);
