import {
  createHideLaunchpadToastAction,
  createShowLaunchpadToastAction,
  createShowLaunchpadToastActionFromError,
  hideLaunchpadShowActionType,
  HideLaunchpadToastAction,
  launchpadToastDefaultDismissId,
  ShowLaunchpadToastAction,
  showLaunchpadToastActionType
} from "../launchpad_toast";
import { LaunchpadToastType } from "../../../../models/launchpad_toast";
import { PlaceHolderValues } from "../../../../i18n/format_message";
import { createCalloutErrorFixture } from "../../../../error/__fixtures__/error";
import { createMessageId, createPlaceHolderValues } from "../../services/launchpad_toast";

describe("Launchpad Toast", () => {

  const messageId = "messageId";
  const dismissId = "dismissId";
  const placeHolderValues: PlaceHolderValues = {
    field: "test"
  };
  describe("createShowLaunchpadToastAction", () => {

    it("creates action", () => {

      const actionExpected: ShowLaunchpadToastAction = {
        type: showLaunchpadToastActionType,
        messageId,
        placeHolderValues,
        dismissId,
        toastType: LaunchpadToastType.info
      };

      expect(createShowLaunchpadToastAction(messageId, dismissId, LaunchpadToastType.info, placeHolderValues)).toEqual(actionExpected);

    });

    it("creates action with default values", () => {

      const actionExpected: ShowLaunchpadToastAction = {
        type: showLaunchpadToastActionType,
        messageId,
        placeHolderValues: {},
        dismissId: launchpadToastDefaultDismissId,
        toastType: LaunchpadToastType.error
      };

      expect(createShowLaunchpadToastAction(messageId)).toEqual(actionExpected);

    });

  });

  describe("createHideLaunchpadToastAction", () => {

    const actionExpected: HideLaunchpadToastAction = {
      type: hideLaunchpadShowActionType
    };

    expect(createHideLaunchpadToastAction()).toEqual(actionExpected);

  });

  describe("createShowLaunchpadToastActionFromError", () => {

    it("creates", () => {
      const calloutError = createCalloutErrorFixture();
      const showToastActionExpected: ShowLaunchpadToastAction = {
        type: showLaunchpadToastActionType,
        dismissId: launchpadToastDefaultDismissId,
        messageId: createMessageId(calloutError),
        toastType: LaunchpadToastType.error,
        placeHolderValues: createPlaceHolderValues(calloutError)
      };

      const actionReturned = createShowLaunchpadToastActionFromError(calloutError);

      expect(actionReturned).toEqual(showToastActionExpected);

    });

  });

});
