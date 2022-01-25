import { CalloutError, CalloutErrorDetails, CalloutErrorType, ErrorType } from "../../error/error";
import { fromNullable } from "fp-ts/lib/Option";
import { isEmpty, not, pipe } from "ramda";

export const createBasicHeaderData = (username: string, password: string) => `Basic ${btoa(`${username}:${password}`)}`;
export const createBasicAuthHeader = (username: string, password: string): Record<string, string> => ({
  Authorization: createBasicHeaderData(username.toLowerCase(), password)
});
export const createAuthHeader = (username: string, password: string): Record<string, string> => ({
  auth: createBasicHeaderData(username, password)
});

export const voidTransformer = () => Promise.resolve();


export const parseErrorBody = (body: string): Array<CalloutErrorDetails> =>
  fromNullable(body)
    .filter(pipe(isEmpty, not))
    .map(content => {
      try {
        return JSON.parse(content);
      } catch (e) {
        return [];
      }
    })
    .getOrElse([]);
const isOkResponse = (status: number) => status >= 200 && status < 300;
export const checkOrThrowCalloutError = (errorType: ErrorType) => async (status: number, body: string) => {
  if (!isOkResponse(status)) {
    switch (status) {
      case 422:
        throw new CalloutError("Unprocessable Entity", errorType, CalloutErrorType.unprocessable_entity, parseErrorBody(body));
      case 409:
        throw new CalloutError("Conflict", errorType, CalloutErrorType.conflict);
      case 403:
        throw new CalloutError("Unauthorized Callout", errorType, CalloutErrorType.forbidden);
      case 401:
        throw new CalloutError("Unauthorized Callout", errorType, CalloutErrorType.unauthorized);
      case 400:
        throw new CalloutError("Unauthorized Callout", errorType, CalloutErrorType.badRequest);
      default:
        throw new CalloutError("Unauthorized Callout", errorType, CalloutErrorType.error);
    }
  }


};
