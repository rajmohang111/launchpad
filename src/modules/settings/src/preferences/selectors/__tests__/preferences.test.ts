import * as OnsenMock from "../../../../../../__mocks__/react-onsenui";
jest.mock("react-onsenui", () => OnsenMock);

import { RootState, createInitRootState } from "../../../../../../main/reducers/main";
import { getPreferencesState } from "../preferences";

describe("Preferences Selectors", () => {
  describe("getPreferencesState", () => {
    const rootState: RootState = createInitRootState();
    it("should return preference state", () => {
      expect(getPreferencesState(rootState)).toEqual(rootState.modules.settings.preferences);
    });
  });
});
