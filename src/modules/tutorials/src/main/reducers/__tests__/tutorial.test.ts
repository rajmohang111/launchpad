import { tutorialState, default as tutorialReducer, createSlideInitState } from "../tutorial";
import { TutorialActions } from "../../actions/tutorial";
import { ACTION_SLIDE_CHANGE } from "../../constants/tutorial";

describe("Tutorial Reducers", () => {

  describe("createTutorialInitState", () => {

    it("create Tutorials Init", () => {

      const stateExpected: tutorialState = {
        slideIndex: 0
      };

      expect(createSlideInitState()).toEqual(stateExpected);
    });

  });

  describe("reducer", () => {

    it("return state", () => {
      const state = createSlideInitState();
      expect(tutorialReducer(state, {} as TutorialActions)).toEqual(state);
    });

    it("should change slides", () => {
      const state = createSlideInitState();
      const slideIndex = 1;
      const updateState = tutorialReducer(state, { type: ACTION_SLIDE_CHANGE, payload: slideIndex });
      expect(updateState.slideIndex).toEqual(slideIndex);
    });

  });

});