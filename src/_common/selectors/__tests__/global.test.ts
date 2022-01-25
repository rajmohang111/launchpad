import * as OnsenMock from "../../../__mocks__/react-onsenui";
jest.mock("react-onsenui", () => OnsenMock);

import { createInitRootState, RootState } from "../../../main/reducers/main";
import { getGlobalState } from "../global";

describe("Global Selector", () => {

  describe("getGlobalState", () => {

    const rootState: RootState = createInitRootState();

    it("returns global state", () => {

      expect(getGlobalState(rootState)).toEqual(rootState.global);

    });

  });

});
