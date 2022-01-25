import {createSelector} from "reselect";
import {ProductivityState} from "../../main/reducers";
import {getProductivity} from "../../main/selectors";
import {ProductivityDetailsState} from "../reducers/details";
import {RootState} from "../../../../../main/reducers/main";
import {Device} from "../../_common/models/device";
import {MeasurementGroup} from "../../_common/models/measurements";
import {DEVICE_ORIENTATION} from "../../../../../_common/models/device_orientation";
import {fromNullable} from "fp-ts/lib/Option";

export const getProductivityDetails = createSelector<RootState, ProductivityState | undefined, ProductivityDetailsState | undefined>(
  [getProductivity],
  (productivity: ProductivityState) =>
    fromNullable(productivity)
      .mapNullable<ProductivityDetailsState>(state => state.details)
      .toUndefined()
);

export const getProductivityDetailsIsRunning = createSelector<RootState, ProductivityDetailsState | undefined, boolean>(
  [getProductivityDetails],
  (details: ProductivityDetailsState) =>
    fromNullable(details)
      .mapNullable<boolean>(state => state.isRunning)
      .getOrElse(false)
);

export const getProductivityDetailsShouldLoadMeasurements = createSelector<RootState, ProductivityDetailsState | undefined, boolean>(
  [getProductivityDetails],
  (details: ProductivityDetailsState) =>
    fromNullable(details)
      .mapNullable<boolean>(state => state.shouldLoadMeasurements)
      .getOrElse(false)
);

export const getProductivityDetailsData = createSelector<RootState, ProductivityDetailsState | undefined, Device | null>(
  [getProductivityDetails],
  (details: ProductivityDetailsState) =>
    fromNullable(details)
      .mapNullable<Device>(state => state.data)
      .toNullable()
);

export const getProductivityDetailsDisplayMetersPerHour = createSelector<RootState, ProductivityDetailsState | undefined, boolean>(
  [getProductivityDetails],
  (details: ProductivityDetailsState) =>
    fromNullable(details)
      .mapNullable<boolean>(state => state.displayMetersPerHour)
      .getOrElse(false)
);

export const getProductivityDetailsMeasurementGroups = createSelector<RootState, ProductivityDetailsState | undefined, ReadonlyArray<MeasurementGroup>>(
  [getProductivityDetails],
  (details: ProductivityDetailsState) =>
    fromNullable(details)
      .mapNullable<ReadonlyArray<MeasurementGroup>>(state => state.measurementGroups)
      .getOrElse([])
);

export const getProductivityDetailsDeviceOrientation = createSelector<RootState, ProductivityDetailsState | undefined, DEVICE_ORIENTATION>(
  [getProductivityDetails],
  (details: ProductivityDetailsState) =>
    fromNullable(details)
      .mapNullable<DEVICE_ORIENTATION>((state: ProductivityDetailsState) => state.orientation)
      .getOrElse(DEVICE_ORIENTATION.PORTRAIT)
);
