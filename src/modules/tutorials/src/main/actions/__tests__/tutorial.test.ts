import { createPreferenceActionsMock } from "../../../../../settings/src/preferences/actions/__fixtures__/preference";
jest.mock("../../../../../settings/src/preferences/actions/preferences", () => createPreferenceActionsMock());

import * as ActionTypes from "../../constants/tutorial";
import * as Actions from "../tutorial";
import { createSwitchTutorialStateAction ,onOversScroll } from "../tutorial";
import {
  createUpdatePreferenceAction,
} from "../../../../../settings/src/preferences/actions/preferences";
import {
  createPreferenceTestStore,
  TestPreferenceStore
} from "../../../../../settings/src/preferences/services/__test_data__/device_store";
import { Preference } from "../../../../../../_common/models/settings";
import { createPreferenceFixture } from "../../../../../../_common/rest/models/__fixture__/settings";
import { Dispatch } from "redux";
import {  RootState } from "../../../../../../main/reducers/main";
import { createNavigateBackAction } from "../../../../../../app/actions/routing";

describe("Tutorial Actions", () => {

  const preferenceDeviceStore: TestPreferenceStore = createPreferenceTestStore();
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });


  it("should create an action to slide tutorial", () => {
    const payload = 1;
    const expectedAction = {
      type: ActionTypes.ACTION_SLIDE_CHANGE,
      payload
    };
    expect(Actions.onSlideChange(payload)).toEqual(expectedAction);
  });
  it("should create an action to slide tutorial on swipe", () => {
    const payload = 1;
    const expectedAction = {
      type: ActionTypes.ACTION_SLIDE_CHANGE,
      payload
    };
    expect(Actions.onSwipeChange(payload)).toEqual(expectedAction);
  });
  it("should create an action to hide slide", () => {
    const payload = false;
    const expectedAction = {
      type: ActionTypes.ACTION_SLIDE_HIDE,
      payload
    };
    expect(Actions.onhideSlide()).toEqual(expectedAction);
  });

  describe("createSwitchTutorialStateAction", () => {

    const preference: Preference = createPreferenceFixture();
    it("updates preference state with updated tutorial state", async () => {

      const preferenceExpected: Preference = {
        ...preference,
        hideTutorial: true
      };
      (createUpdatePreferenceAction as jest.Mock).mockReturnValue(() => Promise.resolve());

      createSwitchTutorialStateAction(preference, true, preferenceDeviceStore)(dispatch, jest.fn(), undefined);

      expect(createUpdatePreferenceAction).toHaveBeenCalledWith(preferenceExpected, preferenceDeviceStore);
    });

  });

  describe("onOversScrollAction", () => {

    it("on overscroll action at 3rd page  ", async () => {
      const slideIndex=2;
      const actionsCreator = onOversScroll(slideIndex);
      const dispatchMock = jest.fn<Dispatch>();
      const stateMock = jest.fn<() => RootState>();
      await actionsCreator(dispatchMock, stateMock, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(createNavigateBackAction());
    });

    it("on overscroll action at page less than 3  ", async () => {
      const slideIndex=1;
      const actionsCreator = onOversScroll(slideIndex);
      const dispatchMock = jest.fn<Dispatch>();
      const stateMock = jest.fn<() => RootState>();
      await actionsCreator(dispatchMock, stateMock, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(0);
    });
  });
});
