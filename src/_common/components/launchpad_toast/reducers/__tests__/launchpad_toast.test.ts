import launchpadToastReducer, { createLaunchpadToastInitState, LaunchpadToastState } from "../launchpad_toast";
import {
  createHideLaunchpadToastAction,
  createShowLaunchpadToastAction,
  HideLaunchpadToastAction,
  ShowLaunchpadToastAction
} from "../../actions/launchpad_toast";
import { LaunchpadToastType } from "../../../../models/launchpad_toast";
import { PlaceHolderValues } from "../../../../i18n/format_message";

describe("Launchpad Toast Reducer", () => {


  const state: LaunchpadToastState = createLaunchpadToastInitState();
  const messageId = "messageId";
  const dismissId = "dismissId";
  const toastType = LaunchpadToastType.info;
  const placeHolders: PlaceHolderValues = {
    field: "test"
  };
  describe("init", () => {

    it("creates init state", () => {

      const stateExpected: LaunchpadToastState = {
        metadata: {
          isOpen: false,
        },
        messageId: "",
        placeHolders: {},
        dismissId: "",
        toastType: LaunchpadToastType.error
      };

      expect(createLaunchpadToastInitState()).toEqual(stateExpected);

    });

  });

  describe("showLaunchpadToastActionType", () => {

    it("shows toast and sets toast content", () => {

      const showAction: ShowLaunchpadToastAction = createShowLaunchpadToastAction(messageId, dismissId, toastType, placeHolders);
      const stateExpected: LaunchpadToastState = {
        ...state,
        metadata: {
          ...state.metadata,
          isOpen: true
        },
        messageId,
        placeHolders,
        dismissId,
        toastType
      };

      const stateReturned: LaunchpadToastState = launchpadToastReducer(state, showAction);

      expect(stateReturned).toEqual(stateExpected);

    });

  });

  describe("hideLaunchpadShowActionType", () => {

    it("resets launchpad to init state", () => {

      const hideAction: HideLaunchpadToastAction = createHideLaunchpadToastAction();
      const stateWithOpenLaunchpadToast: LaunchpadToastState = {
        ...state,
        metadata: {
          ...state.metadata
        },
        dismissId,
        messageId
      };
      const stateExpected = state;

      const stateReturned = launchpadToastReducer(stateWithOpenLaunchpadToast, hideAction);

      expect(stateReturned).toEqual(stateExpected);

    });

  });

});
