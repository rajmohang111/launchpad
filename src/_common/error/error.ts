export enum ErrorType {

  settingsDeviceStore = "settingsStore",
  preferenceDeviceStore = "preferenceStore",
  accountDeviceStore = "accountDeviceStore",
  systemStore = "systemStore",
  launchpadBootstrap = "launchpadBootstrap",
  backendCallError = "backendError",
  accountRestService = "accountRestService",
  internalError = "internalError",
  productivityCall = "productivityCall",
  updateAccountPasswordMismatch = "updateAccountPasswordMismatch",

}

export enum InternalErrorType {
  launchpadError, calloutError, deviceStoreError
}

export class LaunchPadError extends Error {

  public type: ErrorType;


  constructor(message: string, type: ErrorType) {
    super(message);
    this.type = type;
  }
}

export enum CalloutErrorType {
  unauthorized = "unauthorized",
  badRequest = "badRequest",
  forbidden = "forbidden",
  error = "error",
  conflict = "conflict",
  unprocessable_entity = "unprocessable_entity"
}

export enum ErrorContentCode {
  validationError = "validationError"
}

export type ErrorContents = InvalidFieldError;
export type InvalidFieldError = {
  field: string,
  description: string
};
export type CalloutErrorDetails = {
  code: ErrorContentCode,
  http_code: string,
  message: string,
  details?: ErrorContents
};

export class CalloutError extends LaunchPadError {


  constructor(message: string, type: ErrorType, public status: CalloutErrorType, public details: Array<CalloutErrorDetails> = []) {
    super(message, type);
  }


}

const isDeviceStoreError = (error: LaunchPadError): boolean =>
  error.type === ErrorType.settingsDeviceStore ||
  error.type === ErrorType.preferenceDeviceStore ||
  error.type === ErrorType.accountDeviceStore ||
  error.type === ErrorType.systemStore
;
const isCalloutError = (error: LaunchPadError): boolean => error["status"];
export const determineInternalErrorType = (error: LaunchPadError): InternalErrorType =>
  isCalloutError(error) ?
    InternalErrorType.calloutError:
    isDeviceStoreError(error) ?
      InternalErrorType.deviceStoreError :
      InternalErrorType.launchpadError;


