import * as OnsenMock from "../../../../../../__mocks__/react-onsenui";
jest.mock("react-onsenui", () => OnsenMock);

import { createInitRootState, RootState } from "../../../../../../main/reducers/main";
import { getTutorialState } from "../tutorial";

describe("Tutorial Selector", () => {

  describe("getTutorialState", () => {

    const rootState: RootState = createInitRootState();

    it("returns tutorial state", () => {

      expect(getTutorialState(rootState)).toEqual(rootState.modules.tutorial);

    });

  });

});
