import { createNavigateWithResetAction, NavigateWithResetAction } from "../../../../../app/actions/routing";
import { AppModule, createModuleSelection } from "../../../../models/module";
import { fromModuleSelection } from "../../../../routing/routing";
import { createNavigateToHomeAction, createNavigateToModuleAction } from "../module_menu";

describe("Module Menu Actions", () => {

  describe("createNavigateToHomeAction", () => {

    it("creates navigate to Home action", () => {

      const actionExpected: NavigateWithResetAction = createNavigateWithResetAction(fromModuleSelection(createModuleSelection(AppModule.launchpad)));

      const actionReturned = createNavigateToHomeAction();

      expect(actionReturned).toEqual(actionExpected);

    });

  });

  describe("createNavigateToModuleAction", () => {


    it("creates navigate to selected module action with launchpad as previous route", () => {

      const selectedAppModule = AppModule.productivity;
      const actionExpected: NavigateWithResetAction = createNavigateWithResetAction(
        fromModuleSelection(createModuleSelection(selectedAppModule)),
        [fromModuleSelection(createModuleSelection(AppModule.launchpad))]
      );

      const actionReturned = createNavigateToModuleAction(selectedAppModule);

      expect(actionReturned).toEqual(actionExpected);

    });

  });

});
