import { createInitRootState } from "../../../main/reducers/main";
import { getModules } from "../modules";

describe("Common Modules Selector", () => {

  const rootState = createInitRootState();
  describe("getModules", () => {

    it("returns modules state", () => {

      expect(getModules(rootState)).not.toBeUndefined();

    });

  });

});
