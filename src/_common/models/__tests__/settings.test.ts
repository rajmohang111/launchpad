import { Salutation, salutationFromString } from "../settings";
import { expectLaunchPadError } from "../../../__test_util__/error";
import { ErrorType } from "../../error/error";

describe("Common settings model", () => {

  describe("salutationFromString", () => {

    it("returns salutation", () => {

      expect(salutationFromString(Salutation.MR)).toEqual(Salutation.MR);

    });

    it("throws LaunchPad Error in case salutation does not exist", () => {

      try {
        salutationFromString("doesNotExist");
        fail("Should throw");
      } catch (e) {
        expectLaunchPadError(e, ErrorType.internalError);
      }

    });

  });

});
