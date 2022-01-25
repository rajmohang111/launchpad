import {
  CalloutError,
  CalloutErrorDetails,
  CalloutErrorType,
  ErrorContentCode,
  ErrorType,
  InvalidFieldError
} from "../error";

export const createInvalidFieldErrorFixture = (): InvalidFieldError => ({
  field: "mobile",
  description: "mobile phone number is invalid"
});
export const createCalloutErrorContentFixture = (): Required<CalloutErrorDetails> => ({
  code: ErrorContentCode.validationError,
  http_code: "422",
  message: "Invalid field",
  details: createInvalidFieldErrorFixture()
});

export const createValidationErrorFixture = (): Required<CalloutErrorDetails> => createCalloutErrorContentFixture();

export const createCalloutErrorFixture = () => new CalloutError("test",
  ErrorType.accountRestService, CalloutErrorType.unprocessable_entity, [createCalloutErrorContentFixture()]);
