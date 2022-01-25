import {
  CalloutError,
  CalloutErrorDetails,
  CalloutErrorType,
  ErrorContentCode,
  ErrorType,
  LaunchPadError
} from "../../../../error/error";
import {
  accessDeniedMessageID,
  authorizationFailedMessageId,
  calloutFailedMessage,
  deviceStoreError,
  launchpadToastDefaultErrorMessageId,
  launchpadToastValidationError,
  launchpadToastValidationErrorDefault,
  MessageIdFromCalloutError,
  PlaceHolderValuesFromCalloutError
} from "../../actions/launchpad_toast";
import {
  createMessageId,
  createMessageIdFromCalloutError,
  createMessageIdFromErrorDetails,
  createPlaceHolderValues,
  createPlaceHolderValuesFromCalloutErrorDetails,
  isValidSingleCalloutErrorDetails
} from "../launchpad_toast";
import {
  createCalloutErrorContentFixture,
  createCalloutErrorFixture,
  createValidationErrorFixture
} from "../../../../error/__fixtures__/error";
import { PlaceHolderValues } from "../../../../i18n/format_message";

describe("Launchpad Toast Service", () => {

  describe("isValidSingleCalloutErrorDetails", () => {

    const calloutError: CalloutError = createCalloutErrorFixture();
    it("returns true in case callout error contains at least a single error details", () => {

      expect(isValidSingleCalloutErrorDetails(calloutError)).toBeTruthy();

    });

    it("returns false in case callout error does not contain error details", () => {

      const calloutErrorNoDetails = new CalloutError("test", ErrorType.accountRestService, CalloutErrorType.unprocessable_entity);
      expect(isValidSingleCalloutErrorDetails(calloutErrorNoDetails)).toBeFalsy();

    });

  });

  describe("createMessageIdFromCalloutError", () => {

    it("creates message id for authorization failed error", () => {
      const calloutError = new CalloutError("Callout Error", ErrorType.accountRestService, CalloutErrorType.unauthorized);
      const messageIdExpected = authorizationFailedMessageId;

      const messageIdReturned = createMessageIdFromCalloutError(calloutError);

      expect(messageIdReturned).toEqual(messageIdExpected);

    });

    it("creates message id for forbidden error", () => {
      const calloutError = new CalloutError("Callout Error", ErrorType.accountRestService, CalloutErrorType.forbidden);
      const messageIdExpected = accessDeniedMessageID;

      const messageIdReturned = createMessageIdFromCalloutError(calloutError);

      expect(messageIdReturned).toEqual(messageIdExpected);

    });

    it("takes first error and creates message id for unprocessable entity error", () => {
      const errorDetails: Array<CalloutErrorDetails> = [
        createCalloutErrorContentFixture(),
        createCalloutErrorContentFixture()
      ];
      const calloutError = new CalloutError("CalloutError", ErrorType.accountRestService, CalloutErrorType.unprocessable_entity, errorDetails);
      const messageIdExpected = launchpadToastValidationError;

      const messageIdReturned = createMessageIdFromCalloutError(calloutError);

      expect(messageIdReturned).toEqual(messageIdExpected);

    });

    it("returns default message in case error content is not set for unprocessable entity", () => {
      const calloutError = new CalloutError("CalloutError", ErrorType.accountRestService, CalloutErrorType.unprocessable_entity);
      const messageIdExpected = launchpadToastValidationErrorDefault;

      const messageIdReturned = createMessageIdFromCalloutError(calloutError);

      expect(messageIdReturned).toEqual(messageIdExpected);


    });

    it("creates message id for default error", () => {
      const calloutError = new CalloutError("Callout Error", ErrorType.accountRestService, CalloutErrorType.error);
      const messageIdExpected = calloutFailedMessage;

      const messageIdReturned = createMessageIdFromCalloutError(calloutError);

      expect(messageIdReturned).toEqual(messageIdExpected);

    });

  });

  describe("createMessageId", () => {

    it("createsMessageId for Callout error", () => {
      const calloutError = new CalloutError("Callout Error", ErrorType.accountRestService, CalloutErrorType.unauthorized);
      const messageIdExpected = authorizationFailedMessageId;

      const messageIdReturned = createMessageId(calloutError);

      expect(messageIdReturned).toEqual(messageIdExpected);

    });

    it("creates message Id for device store error", () => {
      const calloutError = new LaunchPadError("Callout Error", ErrorType.accountDeviceStore);
      const messageIdExpected = deviceStoreError;

      const messageIdReturned = createMessageId(calloutError);

      expect(messageIdReturned).toEqual(messageIdExpected);
    });

    it("creates message Id for launchpad error", () => {
      const calloutError = new LaunchPadError("Callout Error", ErrorType.launchpadBootstrap);
      const messageIdExpected = launchpadToastDefaultErrorMessageId;

      const messageIdReturned = createMessageId(calloutError);

      expect(messageIdReturned).toEqual(messageIdExpected);
    });

    it("leverages provided function for creating message ids from CalloutErrors", () => {
      const calloutError = new CalloutError("Callout Error", ErrorType.accountRestService, CalloutErrorType.unauthorized);
      const testMessageId = "test";
      const messageIdFromCalloutError: MessageIdFromCalloutError = error => testMessageId;

      const messageIdReturned = createMessageId(calloutError, messageIdFromCalloutError);

      expect(messageIdReturned).toEqual(testMessageId);

    });

  });

  describe("createPlaceHolderValuesFromCalloutErrorDetails", () => {

    const invalidFieldError: Required<CalloutErrorDetails> = createValidationErrorFixture();
    it("creates placeholder values for invalid field error ", () => {
      const placeHoldersExpected: PlaceHolderValues = {
        field: invalidFieldError.details.field
      };

      const placeHoldersReturned = createPlaceHolderValuesFromCalloutErrorDetails(invalidFieldError);

      expect(placeHoldersReturned).toEqual(placeHoldersExpected);

    });

    it("returns empty object in case error details is not set in validation error", () => {
      const invalidFieldErrorNoContent: CalloutErrorDetails = {
        ...invalidFieldError,
        details: undefined
      };
      const placeholdersExpected: PlaceHolderValues = {};

      const placeHoldersReturned = createPlaceHolderValuesFromCalloutErrorDetails(invalidFieldErrorNoContent);

      expect(placeHoldersReturned).toEqual(placeholdersExpected);
    });

    it("returns empty object for other error", () => {
      const invalidFieldErrorOtherError: Required<CalloutErrorDetails> = {
        ...invalidFieldError,
        code: "doesNoteExist" as ErrorContentCode
      };
      const placeholdersExpected: PlaceHolderValues = {};

      const placeHoldersReturned = createPlaceHolderValuesFromCalloutErrorDetails(invalidFieldErrorOtherError);

      expect(placeHoldersReturned).toEqual(placeholdersExpected);

    });

  });

  describe("createMessageIdFromErrorDetails", () => {

    const invalidFieldError: CalloutErrorDetails = createValidationErrorFixture();
    it("creates message id for invalid field error", () => {
      const messageIdExpected = launchpadToastValidationError;

      const messageIdReturned = createMessageIdFromErrorDetails(invalidFieldError);

      expect(messageIdReturned).toEqual(messageIdExpected);

    });

    it("creates message id for unknown error code", () => {
      const invalidFieldErrorUnknownCode: CalloutErrorDetails = {
        ...invalidFieldError,
        code: "doesNotExist" as ErrorContentCode
      };
      const messageIdExpected = launchpadToastDefaultErrorMessageId;

      const messageIdReturned = createMessageIdFromErrorDetails(invalidFieldErrorUnknownCode);

      expect(messageIdReturned).toEqual(messageIdExpected);
    });

  });

  describe("createPlaceHolderValues", () => {

    const errorDetails: Required<CalloutErrorDetails> = createCalloutErrorContentFixture();
    const calloutError = new CalloutError("test", ErrorType.accountRestService, CalloutErrorType.unprocessable_entity, [errorDetails]);

    it("returns placeholder values with defaults for first callout error details in array", () => {
      const placeHolderExpected: PlaceHolderValues = {
        field: errorDetails.details.field
      };

      const placeHoldersReturned = createPlaceHolderValues(calloutError);

      expect(placeHoldersReturned).toEqual(placeHolderExpected);
    });

    it("returns placeholder values defined by provided placeholder function", () => {
      const testPlaceHolders: PlaceHolderValues = {
        field: "test"
      };
      const placeHolderFunction: PlaceHolderValuesFromCalloutError = _ => testPlaceHolders;

      const placeHoldersReturned = createPlaceHolderValues(calloutError, placeHolderFunction);

      expect(placeHoldersReturned).toEqual(testPlaceHolders);

    });

    it("returns empty placeholder object in case error details is not set", () => {
      const calloutErrorNoContent = new CalloutError("test", ErrorType.accountRestService, CalloutErrorType.unprocessable_entity);
      const placeHoldersExpected = {};

      const placeHoldersReturned = createPlaceHolderValues(calloutErrorNoContent);

      expect(placeHoldersReturned).toEqual(placeHoldersExpected);

    });

    it("returns empty placeholder object in case error is not a callout error", () => {
      const otherError = new LaunchPadError("test", ErrorType.accountRestService);
      const placeHoldersExpected = {};

      const placeHoldersReturned = createPlaceHolderValues(otherError);

      expect(placeHoldersReturned).toEqual(placeHoldersExpected);
    });

  });

});
