import {Action, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {default as ProductivityDetails} from "../../details/containers/Details";
import {RootState} from "../../../../../main/reducers/main";
import {
  createNavigateForwardAction,
  NavigateForwardAction
} from "../../../../../app/actions/routing";
import {Device} from "../../_common/models/device";
import {createOpenDeviceDetailsAction, OpenDeviceDetailsAction} from "../../_common/actions/actions";

export {LaunchPadErrorAction} from "../../../../../app/actions/error";

export type OverviewActions =
  NavigateForwardAction |
  OpenDeviceDetailsAction |
  Action;

export const createNavigateToDetailsAction = (data: Device): ThunkAction<void, RootState, void, OverviewActions> =>
  (dispatch: Dispatch): OverviewActions => {
    dispatch(createOpenDeviceDetailsAction(data));
    return dispatch(createNavigateForwardAction({
      component: ProductivityDetails,
      props: {
        key: `${data.id}`,
      }
    }));
  };
