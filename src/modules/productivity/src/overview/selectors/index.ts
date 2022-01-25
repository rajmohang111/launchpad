import {createSelector} from "reselect";
import {ProductivityState} from "../../main/reducers";
import {getProductivity} from "../../main/selectors";
import {ProductivityOverviewState} from "../reducers/overview";
import {RootState} from "../../../../../main/reducers/main";

export const getProductivityOverview = createSelector<RootState, ProductivityState | undefined, ProductivityOverviewState | undefined>(
  [getProductivity],
  (productivity: ProductivityState | undefined) => {
    if (productivity && productivity !== null) {
      return productivity.overview;
    }
    return undefined;
  }
);

export const getProductivityOverviewLastUpdated = createSelector<RootState, ProductivityOverviewState | undefined, number>(
  [getProductivityOverview],
  (overview: ProductivityOverviewState | undefined) => {
    if (overview && overview !== null) {
      return overview.lastUpdated;
    }
    return 0;
  }
);

export const getProductivityOverviewShouldLoadDevices = createSelector<RootState, ProductivityOverviewState | undefined, boolean>(
  [getProductivityOverview],
  (overview: ProductivityOverviewState | undefined) => {
    if (overview && overview !== null) {
      return overview.shouldLoadDevices;
    }
    return false;
  }
);

export const getProductivityOverviewIsRunning = createSelector<RootState, ProductivityOverviewState | undefined, boolean>(
  [getProductivityOverview],
  (overview: ProductivityOverviewState | undefined) => {
    if (overview && overview !== null) {
      return overview.isRunning;
    }
    return false;
  }
);
