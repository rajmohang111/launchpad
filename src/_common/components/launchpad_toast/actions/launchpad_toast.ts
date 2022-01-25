import { Action } from "redux";
import { LaunchpadToastType } from "../../../models/launchpad_toast";
import { CalloutError, CalloutErrorDetails, LaunchPadError } from "../../../error/error";
import { createMessageId, createPlaceHolderValues } from "../services/launchpad_toast";
import { PlaceHolderValues } from "../../../i18n/format_message";

export const launchpadToastDefaultErrorMessageId = "launchpad_toast_default_error";
export const launchpadToastDefaultDismissId = "launchpad_toast_dismiss";
export const authorizationFailedMessageId = "launchpad_toast_callout_unauthorized";
export const accessDeniedMessageID = "launchpad_toast_callout_forbidden";
export const calloutFailedMessage = "launchpad_toast_callout_error";
export const deviceStoreError = "launchpad_toast_store_error";
export const launchpadToastValidationError = "launchpad_toast_validation_error";
export const launchpadToastValidationErrorDefault = "launchpad_toast_validation_error_default";

export const showLaunchpadToastActionType = "LAUNCHPAD_TOAST_SHOW";
export const hideLaunchpadShowActionType = "LAUNCHPAD_TOAST_HIDE";

export type ShowLaunchpadToastAction = Action & {
  messageId: string,
  placeHolderValues: PlaceHolderValues
  dismissId: string,
  toastType: LaunchpadToastType
};

export type HideLaunchpadToastAction = Action;

export type LaunchpadToastAction =
  ShowLaunchpadToastAction |
  HideLaunchpadToastAction;

export type MessageIdFromCalloutError = (error: CalloutError) => string;
export type PlaceHolderValuesFromCalloutError = (errorContent: CalloutErrorDetails) => PlaceHolderValues;

export const createShowLaunchpadToastAction = (messageId: string,
                                               dismissId: string = launchpadToastDefaultDismissId,
                                               toastType: LaunchpadToastType = LaunchpadToastType.error,
                                               placeHolderValues = {}): ShowLaunchpadToastAction => ({
  type: showLaunchpadToastActionType,
  messageId,
  placeHolderValues,
  dismissId,
  toastType
});

export const createShowLaunchpadToastActionFromError = (error: LaunchPadError, dismissId = launchpadToastDefaultDismissId) => {
  return createShowLaunchpadToastAction(createMessageId(error), dismissId, LaunchpadToastType.error, createPlaceHolderValues(error));
};

export const createHideLaunchpadToastAction = (): HideLaunchpadToastAction => ({
  type: hideLaunchpadShowActionType
});
