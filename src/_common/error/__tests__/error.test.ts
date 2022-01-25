import {
  CalloutError,
  CalloutErrorType,
  determineInternalErrorType,
  ErrorType,
  InternalErrorType,
  LaunchPadError
} from "../error";

describe("Common Error Model", () => {

  describe("isCalloutError", () => {

    it("returns callout error", () => {
      const calloutError: CalloutError = new CalloutError("Callout Error", ErrorType.accountRestService, CalloutErrorType.error);

      expect(determineInternalErrorType(calloutError)).toEqual(InternalErrorType.calloutError);

    });

    it("returns launchpad error", () => {

      const launchpadError: LaunchPadError = new LaunchPadError("Launchpad Error", ErrorType.internalError);

      expect(determineInternalErrorType(launchpadError)).toEqual(InternalErrorType.launchpadError);

    });

    it("returns device store error", () => {
      const launchpadError: LaunchPadError = new LaunchPadError("Launchpad Error", ErrorType.accountDeviceStore);

      expect(determineInternalErrorType(launchpadError)).toEqual(InternalErrorType.deviceStoreError);

    });

  });
  
});
