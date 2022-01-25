import { AppModule } from "../../../../models/module";
import { isAppModuleSelected } from "../module_menu";

describe("Module Menu Services", () => {

  const selectedModule: AppModule = AppModule.productivity;
  describe("isAppModuleSelected", () => {

    it("returns true in case module is selected", () => {

      expect(isAppModuleSelected(AppModule.productivity, selectedModule)).toBeTruthy();

    });

    it("returns false in case module is not selected", () => {

      const otherModule: AppModule = AppModule.tutorial;

      expect(isAppModuleSelected(AppModule.productivity, otherModule)).toBeFalsy();
    });

    it("returns false in case no module is selected", () => {

      expect(isAppModuleSelected(AppModule.productivity, null)).toBeFalsy();
    });

  });
  
});
