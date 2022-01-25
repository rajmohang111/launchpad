import {Device} from "../../_common/models/device";
import {ProductivityRestService} from "../../_common/services/rest";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../../../../../main/reducers/main";
import {Action, Dispatch} from "redux";
import {createLaunchPadErrorAction, LaunchPadErrorAction} from "../../../../../app/actions/error";
import {ErrorType, LaunchPadError} from "../../../../../_common/error/error";
import {getAccountCredential} from "../../../../../_common/selectors/settings";
import {createBasicHeaderData} from "../../../../../_common/rest/services/rest";
import {createShowLaunchpadToastActionFromError} from "../../../../../_common/components/launchpad_toast/actions/launchpad_toast";

export const FETCH_OVERVIEW_DATA = "FETCH_OVERVIEW_DATA";
export const FETCH_OVERVIEW_DATA_FINISHED = "FETCH_OVERVIEW_DATA_FINISHED";
export const FETCH_OVERVIEW_DATA_ERROR = "FETCH_OVERVIEW_DATA_ERROR";

export type OverviewDataFetchAction = Action;

export interface OverviewDataFetchFinishedAction extends Action {
  devices: Array<Device>;
}

export type ProductivityActions =
  OverviewDataFetchAction |
  OverviewDataFetchFinishedAction |
  LaunchPadErrorAction |
  Action;

export const createFetchOverviewDataAction = (): OverviewDataFetchAction => ({
  type: FETCH_OVERVIEW_DATA,
});

export const createFetchOverviewDataFinishedAction = (data: Array<Device>): OverviewDataFetchFinishedAction => ({
  type: FETCH_OVERVIEW_DATA_FINISHED,
  devices: data,
});

export const createFetchDataAction = (done: () => void, service: ProductivityRestService): ThunkAction<void, RootState, void, ProductivityActions> =>
  (dispatch: Dispatch, getState: () => RootState): Promise<ProductivityActions> => {
    if (service && service !== null) {
      const credential = getAccountCredential(getState());
      const auth = createBasicHeaderData(credential.username, credential.password);
      dispatch(createFetchOverviewDataAction());
      return service.loadDevices(auth)
      .then((devices: Array<Device>) => {
        done();
        return dispatch(createFetchOverviewDataFinishedAction(devices));
      })
      .catch(error => {
        done();
        dispatch(createShowLaunchpadToastActionFromError(error));
        return dispatch(createLaunchPadErrorAction(FETCH_OVERVIEW_DATA_ERROR, error));
      });
    }
    done();
    const error = new LaunchPadError("Service Not Available", ErrorType.productivityCall);
    dispatch(createShowLaunchpadToastActionFromError(error));
    return Promise.resolve(dispatch(createLaunchPadErrorAction(FETCH_OVERVIEW_DATA_ERROR, error)));
  };
