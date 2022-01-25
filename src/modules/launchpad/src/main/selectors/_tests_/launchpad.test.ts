import * as OnsenMock from "../../../../../../__mocks__/react-onsenui";
jest.mock("react-onsenui", () => OnsenMock);

import { RootState, createInitRootState } from "../../../../../../main/reducers/main";
import { getLaunchPadState } from "../launchpad";

describe("Launchpad Selector", () => {
  describe("getLaunchPadState", () => {
    const rootState: RootState = createInitRootState();
    it("should return launchPad state", () => {
      expect(getLaunchPadState(rootState)).toEqual(rootState.modules.launchPad);
    });

  });

});
