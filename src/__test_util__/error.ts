import { CalloutError, CalloutErrorDetails, CalloutErrorType, ErrorType, LaunchPadError } from "../_common/error/error";

export const expectLaunchPadError = (e: Error, errorTypeExpected: ErrorType) => {
  expect(e.message).not.toBeUndefined();
  expect(e["type"]).not.toBeUndefined();
  const launchPadError = e as LaunchPadError;
  expect(launchPadError.type).toEqual(errorTypeExpected);
};

export const expectCalloutError = (e: Error, errorTypeExpected: ErrorType, calloutErrorTypeExpected: CalloutErrorType, details: Array<CalloutErrorDetails> = []) => {
  expectLaunchPadError(e, errorTypeExpected);
  expect(e["status"]  ).not.toBeUndefined();
  const calloutError = e as CalloutError;
  expect(calloutError.status).toEqual(calloutErrorTypeExpected);
  expect(e["details"]).toEqual(details);
};
