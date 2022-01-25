import { createLaunchPadInitState } from "../launchpad";

describe("LaunchPad Reducers", () => {

  describe("init", () => {

    it("creates init state", () => {
      expect(createLaunchPadInitState()).toEqual({});
    });

  });

});
