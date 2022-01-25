import { AppModule, AppModuleRoutes, ModuleSelection } from "../../models/module";
import { Route } from "react-onsenui";
import { fromModuleSelection } from "../routing";
import * as uuid from "uuid/v4";

describe("Route model", () => {

  describe("fromModuleSelection", () => {

    it("returns route based on module selection", () => {

      (uuid as jest.Mock).mockReturnValue("test");
      const moduleSelection: ModuleSelection = AppModuleRoutes[AppModule.login];
      const routeExpected: Route = {
        component: moduleSelection.component,
        props: {
          key: `${moduleSelection.key}:${uuid()}`,
          ...moduleSelection.props,
          name: moduleSelection.key
        }
      };

      expect(fromModuleSelection(moduleSelection)).toEqual(routeExpected);

    });

  });

});
