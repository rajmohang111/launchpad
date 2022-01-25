import { determineInitModule } from "../module_selector";
import { AppModule } from "../../../_common/models/module";

describe("App module selector", () => {

  describe("determineInitModule", () => {

    it("returns tutorial module in case not hidden by user selection", () => {

      expect(determineInitModule(false)).toEqual(AppModule.tutorial);

    });

    it("returns launchpad module in case tutorial is hidden by user", () => {

      expect(determineInitModule(true)).toEqual(AppModule.launchpad);

    });

  });
  
});
