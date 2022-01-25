import * as OnsenMock from "../../../../../../__mocks__/react-onsenui";
jest.mock("react-onsenui", () => OnsenMock);

jest.mock("../../../../../../app/actions/routing");
import * as routingActions from "../../../../../../app/actions/routing";

import { createModuleSelectionAction } from "../launchpad";
import { Route } from "react-onsenui";
import {
  AppModule,
  createModuleSelection,
  createModuleSelectionWithRedirect,
  ModuleSelection
} from "../../../../../../_common/models/module";
import { fromModuleSelection } from "../../../../../../_common/routing/routing";

describe("LaunchPad Actions", () => {

    describe("createModuleSelectionAction", () => {

    const selectedModule: AppModule = AppModule.settings;
    const redirectModule: AppModule = AppModule.login;

    it("dispatches navigation actions from module selection", () => {

      const routeExpected: Route = fromModuleSelection(createModuleSelection(selectedModule));


      createModuleSelectionAction(selectedModule);

      expect(routingActions.createNavigateForwardAction).toHaveBeenCalledWith(routeExpected);

    });

      it("dispatchtes navigation action with redirect module", () => {

        const moduleSelectionWithRedirect: ModuleSelection = createModuleSelectionWithRedirect(selectedModule, redirectModule);

        const routeExpected = fromModuleSelection(moduleSelectionWithRedirect);

        createModuleSelectionAction(selectedModule, redirectModule);

        expect(routingActions.createNavigateForwardAction).toHaveBeenCalledWith(routeExpected);

      });

  });

});
