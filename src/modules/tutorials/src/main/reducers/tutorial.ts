import * as ActionTypes from "../constants/tutorial";
import { OnSlideChangeAction, TutorialActions } from "../actions/tutorial";
export type tutorialState = {
    slideIndex: number;
  };
  
  export type action = {
    type: string;
    payload: string
  };
  export const createSlideInitState = (): tutorialState => ({
    slideIndex: 0
  });
  
  const tutorialReducer = (state = createSlideInitState(), action: TutorialActions) => {
    switch (action.type) {
      case ActionTypes.ACTION_SLIDE_CHANGE:
        const slideChangeAction = action as OnSlideChangeAction;
        return { ...state, slideIndex: slideChangeAction.payload };
      default:
        return state;
    }
  };
  export default tutorialReducer;
