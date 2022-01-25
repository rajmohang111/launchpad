import { ErrorType, LaunchPadError } from "../../../_common/error/error";
import { createLaunchPadErrorAction, LaunchPadErrorAction } from "../error";

describe("Error Action Creator", () => {

  describe("createLaunchPadErrorAction", () => {

    it("returns error action", () => {

      const error = new LaunchPadError("DeviceStore Error", ErrorType.settingsDeviceStore);
      const errorType = "store";
      const errorActionExpected: LaunchPadErrorAction = {
        type: errorType,
        error
      };

      const errorActionReturned = createLaunchPadErrorAction(errorType, error);

      expect(errorActionReturned).toEqual(errorActionExpected);

    });


  });

});
