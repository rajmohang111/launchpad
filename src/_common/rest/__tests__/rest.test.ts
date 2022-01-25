import { createAuthHeader, createBasicAuthHeader, checkOrThrowCalloutError, parseErrorBody } from "../services/rest";
import { CalloutErrorDetails, CalloutErrorType, ErrorType } from "../../error/error";
import { expectCalloutError } from "../../../__test_util__/error";
import { createCalloutErrorContentFixture } from "../../error/__fixtures__/error";

describe("Common Rest Service", () => {

  describe("createBasicAuthHeader", () => {

    const username = "testUser";
    const password = "testPassword";
    it("creates basic auth header", () => {

      const headerExpected: Record<string, string> = { Authorization: "Basic dGVzdHVzZXI6dGVzdFBhc3N3b3Jk" };

      const headerReturned = createBasicAuthHeader(username.toLowerCase(), password);

      expect(headerReturned).toEqual(headerExpected);

    });

  });

  describe("createAuthHeader", () => {

    const username = "testUser";
    const password = "testPassword";
    it("creates auth header", () => {

      const headerExpected: Record<string, string> = {
        auth: "Basic dGVzdFVzZXI6dGVzdFBhc3N3b3Jk"
      };

      const headerReturned = createAuthHeader(username, password);

      expect(headerReturned).toEqual(headerExpected);

    });

  });

  describe("parseErrorBody", () => {

    const errorContent: Array<CalloutErrorDetails> = [
      createCalloutErrorContentFixture()
    ];
    it("returns error content", () => {

      const errorContentReturned = parseErrorBody(JSON.stringify(errorContent));

      expect(errorContentReturned).toEqual(errorContent);

    });

    it("returns null in case error body empty array", () => {

      const errorContentReturned = parseErrorBody(JSON.stringify([]));

      expect(errorContentReturned).toEqual([]);

    });

    it("returns null in case error body is not defined or empty", () => {

      const errorContentReturned = parseErrorBody("");

      expect(errorContentReturned).toEqual([]);

    });

    it("returns empty array in case JSON parsing fails", () => {

      const errorContentReturned = parseErrorBody("{'false':");

      expect(errorContentReturned).toEqual([]);

    });

  });

  describe("checkOrThrowCalloutError", () => {

    const checkOrThrowCalloutErrorWithStatus = checkOrThrowCalloutError(ErrorType.backendCallError);
    it("throws Callout Error in case status is below 200", async () => {


      try {
        await checkOrThrowCalloutErrorWithStatus(102, "");
        fail("Should throw");
      } catch (e) {
        expectCalloutError(e, ErrorType.backendCallError, CalloutErrorType.error);
      }

    });

    it("throws Callout Error in case status is above 300", async () => {


      try {
        await checkOrThrowCalloutErrorWithStatus(301, "");
        fail("Should throw");
      } catch (e) {
        expectCalloutError(e, ErrorType.backendCallError, CalloutErrorType.error);
      }

    });

    it("throws unauthorized error in case status is 401", async () => {

      try {
        await checkOrThrowCalloutErrorWithStatus(401, "");
        fail("Should throw");
      } catch (e) {
        expectCalloutError(e, ErrorType.backendCallError, CalloutErrorType.unauthorized);
      }

    });

    it("throws bad request error in case status is 400", async () => {

      try {
        await checkOrThrowCalloutErrorWithStatus(400, "");
        fail("Should throw");
      } catch (e) {
        expectCalloutError(e, ErrorType.backendCallError, CalloutErrorType.badRequest);
      }

    });

    it("throws forbidden error in case status is 403", async () => {

      try {
        await checkOrThrowCalloutErrorWithStatus(403, "");
        fail("Should throw");
      } catch (e) {
        expectCalloutError(e, ErrorType.backendCallError, CalloutErrorType.forbidden);
      }

    });

    it("throws conflict error in case status is 409", async () => {

      try {
        await checkOrThrowCalloutErrorWithStatus(409, "");
        fail("Should throw");
      } catch (e) {
        expectCalloutError(e, ErrorType.backendCallError, CalloutErrorType.conflict);
      }

    });

    it("throws unprocessable entity in case status is 422", async () => {

      const errorContent: CalloutErrorDetails = createCalloutErrorContentFixture();
      try {
        await checkOrThrowCalloutErrorWithStatus(422, JSON.stringify([errorContent]));
        fail("Should throw");
      } catch (e) {
        expectCalloutError(e, ErrorType.backendCallError, CalloutErrorType.unprocessable_entity, [errorContent]);
      }

    });

    it("does not throw in case status is between 200 and 300", async () => {


      try {
        await checkOrThrowCalloutErrorWithStatus(200, "");
      } catch (e) {
        fail("Should not throw");
      }

    });

  });


});
