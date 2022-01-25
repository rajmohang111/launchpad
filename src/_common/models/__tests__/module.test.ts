import {
  AppModule,
  AppModuleRoutes,
  createModuleSelection,
  createModuleSelectionWithProps,
  createModuleSelectionWithRedirect,
  ModuleSelection
} from "../module";

describe("AppModule", () => {

  describe("createModuleSelection", () => {

    const selectedModule: AppModule = AppModule.registration;
    it("returns module selection for selected module", () => {

      const moduleSelectionExpected: ModuleSelection = AppModuleRoutes[selectedModule];

      const moduleReturned: ModuleSelection = createModuleSelection(selectedModule);

      expect(moduleReturned).toEqual(moduleSelectionExpected);

    });

  });

  describe("createModuleSelectionWithProps", () => {

    const selectedModule: AppModule = AppModule.registration;
    it("returns module selection with props", () => {

      const props = {
        test: "test"
      };
      const moduleSelectionExpected: ModuleSelection = {
        ...AppModuleRoutes[selectedModule],
        props: {
          ...props
        }
      };

      const moduleSelectionReturned: ModuleSelection = createModuleSelectionWithProps(selectedModule, props);

      expect(moduleSelectionReturned).toEqual(moduleSelectionExpected);
    });

  });

  describe("createModuleSelectionWithRedirect", () => {

    const redirectModule: AppModule = AppModule.login;
    const selectedModule: AppModule = AppModule.registration;
    it("returns module selection with redirect module property", () => {

      const moduleSelectionExpected: ModuleSelection = {
        ...AppModuleRoutes[selectedModule],
        props: {
          redirectModule
        }
      };

      const moduleSelectionReturned: ModuleSelection = createModuleSelectionWithRedirect(selectedModule, redirectModule);

      expect(moduleSelectionReturned).toEqual(moduleSelectionExpected);
    });

  });

});
