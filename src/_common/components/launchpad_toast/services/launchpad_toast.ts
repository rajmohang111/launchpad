import {
  CalloutError,
  CalloutErrorDetails,
  CalloutErrorType,
  determineInternalErrorType,
  ErrorContentCode,
  InternalErrorType,
  LaunchPadError
} from "../../../error/error";
import {
  accessDeniedMessageID,
  authorizationFailedMessageId,
  calloutFailedMessage,
  deviceStoreError,
  launchpadToastDefaultErrorMessageId,
  launchpadToastValidationError, launchpadToastValidationErrorDefault,
  MessageIdFromCalloutError,
  PlaceHolderValuesFromCalloutError
} from "../actions/launchpad_toast";
import { PlaceHolderValues } from "../../../i18n/format_message";
import { not, isEmpty, pipe, always } from "ramda";
import { fromNullable } from "fp-ts/lib/Option";

export const isValidSingleCalloutErrorDetails = (error: CalloutError): boolean =>
  fromNullable(error.details).filter(pipe(isEmpty, not)).map(always(true)).getOrElse(false);

export const createMessageIdFromErrorDetails = (errorDetails: CalloutErrorDetails): string => {
  switch (errorDetails.code) {
    case ErrorContentCode.validationError:
      return launchpadToastValidationError;
    default:
      return launchpadToastDefaultErrorMessageId;
  }
};

export const createPlaceHolderValuesFromCalloutErrorDetails: PlaceHolderValuesFromCalloutError = (errorDetails: CalloutErrorDetails): PlaceHolderValues => {
  switch (errorDetails.code) {
    case ErrorContentCode.validationError:
      return errorDetails.details ?
        {
          field: errorDetails.details.field
        } :
        {};
    default:
      return {};
  }
};


export const createMessageIdFromCalloutError: MessageIdFromCalloutError = (error: CalloutError) => {
  switch (error.status) {
    case CalloutErrorType.unauthorized:
      return authorizationFailedMessageId;
    case CalloutErrorType.forbidden:
      return accessDeniedMessageID;
    case CalloutErrorType.unprocessable_entity:
      // Only processes first error detail in array
      return isValidSingleCalloutErrorDetails(error) ?
        createMessageIdFromErrorDetails(error.details[0]) :
        launchpadToastValidationErrorDefault;
    default:
      return calloutFailedMessage;
  }
};
export const createMessageId = (error: LaunchPadError, messageIdFromCalloutError = createMessageIdFromCalloutError): string => {
  switch (determineInternalErrorType(error)) {
    case InternalErrorType.calloutError:
      const calloutError = error as CalloutError;
      return messageIdFromCalloutError(calloutError);
    case InternalErrorType.deviceStoreError:
      return deviceStoreError;
    default:
      return launchpadToastDefaultErrorMessageId;

  }
};

// Currently only supports a single CalloutErrorDetail
// Takes first in callout error details array
export const createPlaceHolderValues = (error: LaunchPadError,
                                        placeHolderValues = createPlaceHolderValuesFromCalloutErrorDetails): PlaceHolderValues => {
  switch (determineInternalErrorType(error)) {
    case InternalErrorType.calloutError:
      const calloutError = error as CalloutError;
      return isValidSingleCalloutErrorDetails(calloutError) ?
        placeHolderValues(calloutError.details[0]) :
        {};
    default:
    return {};

  }
};
