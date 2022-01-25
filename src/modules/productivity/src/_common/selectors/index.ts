import { createSelector } from "reselect";
import { ProductivityOverviewState } from "../../overview/reducers/overview";
import { RootState } from "../../../../../main/reducers/main";
import { Device } from "../../_common/models/device";
import { getProductivityOverview } from "../../overview/selectors/index";

export const getProductivityOverviewData = createSelector<RootState, ProductivityOverviewState | undefined, Array<Device> | undefined>(
  [getProductivityOverview],
  (overview: ProductivityOverviewState | undefined) => {
    if (overview && overview !== null) {
      return overview.data;
    }
    return undefined;
  }
);

export const getProductivityOverviewDisplayMetersPerHour = createSelector<RootState, ProductivityOverviewState | undefined, boolean>(
  [getProductivityOverview],
  (overview: ProductivityOverviewState | undefined) => {
    if (overview && overview !== null) {
      return overview.displayMetersPerHour;
    }
    return false;
  }
);
