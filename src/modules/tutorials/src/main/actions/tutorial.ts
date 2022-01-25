import { Action , Dispatch} from "redux";
import { ACTION_SLIDE_CHANGE, ACTION_SLIDE_HIDE } from "../constants/tutorial";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { createUpdatePreferenceAction } from "../../../../settings/src/preferences/actions/preferences";
import { PreferenceDeviceStore } from "../../../../settings/src/preferences/services/device_store";
import { Preference } from "../../../../../_common/models/settings";
import { createNavigateBackAction } from "../../../../../app/actions/routing";

export interface OnSlideChangeAction extends Action {
  payload: number;
}
export interface OnSwipeChangeAction extends Action {
  payload: number;
}

export interface OnHideSlideAction extends Action {
  payload: boolean;
}

export type TutorialActions = OnSlideChangeAction | OnSwipeChangeAction | OnHideSlideAction;

export const onSlideChange = (index: number): OnSlideChangeAction => ({
  type: ACTION_SLIDE_CHANGE,
  payload: index
});
export const onhideSlide = (): OnHideSlideAction => ({
  type: ACTION_SLIDE_HIDE,
  payload: false
});

export const onSwipeChange = (index: number): OnSwipeChangeAction => ({
  type: ACTION_SLIDE_CHANGE,
  payload: index
});

export const onOversScroll = (index: number): ThunkAction<void, RootState, void, TutorialActions> =>

  async (dispatch: Dispatch): Promise<void> => {
    if (index === 2) {
      dispatch(createNavigateBackAction());
    }
};




export const createSwitchTutorialStateAction = (preference: Preference, hideTutorial: boolean, preferenceDeviceStore: PreferenceDeviceStore): ThunkAction<void, RootState, void, TutorialActions> =>
  async (dispatch: ThunkDispatch<RootState, undefined, TutorialActions>) => {
    const updatedPreference: Preference = {
      ...preference,
      hideTutorial
    };
    dispatch(createUpdatePreferenceAction(updatedPreference, preferenceDeviceStore));
  };
