import { createUpdateAppStateAction, updateAppStateActionType, AppStateAction } from "../appstate";

describe("App State Action Creator", () => {
  describe("createUpdateAppStateAction", () => {

    const isAppPaused = true;
    it("should create update app state action", () => {
      const expectedUpdateAppState: AppStateAction = {
        type: updateAppStateActionType,
        isAppPaused
      };
      expect(createUpdateAppStateAction(isAppPaused)).toEqual(expectedUpdateAppState);
    });
  });
});
