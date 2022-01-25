import { RouteConfig } from "react-onsenui";
import { createRouteConfigFixture } from "../../models/__fixture__/routing";
import { AppModule } from "../../models/module";
import { getAppModuleFromRouteConfig } from "../routing";
import * as uuid from "uuid/v4";

describe("Common Routing Services", () => {

  describe("getAppModuleFromRouteConfig", () => {

    const routeConfig: RouteConfig = createRouteConfigFixture();
    it("returns App module from route config", () => {

      const appModuleExpected = AppModule[routeConfig.routeStack[0].props.name as string];

      expect(getAppModuleFromRouteConfig(routeConfig)).toEqual(appModuleExpected);

    });

    it("returns App module from route config with multiple routes on stack", () => {

      const routeConfigMultiple: RouteConfig = {
        ...routeConfig,
        routeStack: [
          ...routeConfig.routeStack,
          {
            props: {
              key: `${AppModule.productivity}:${uuid}`,
              name: AppModule.productivity
            }
          }
        ]
      };

      const appModuleExpected = AppModule[routeConfigMultiple.routeStack[1].props.name as string];

      expect(getAppModuleFromRouteConfig(routeConfigMultiple)).toEqual(appModuleExpected);

    });

    it("returns null in case app module cannot be found", () => {

      const routeConfigWithNotExistingAppModule: RouteConfig = {
        ...routeConfig,
        routeStack: [
          {
            ...routeConfig.routeStack[0],
            props: {
              ...routeConfig.routeStack[0].props,
              name: "doesNotExist"
            }
          }
        ]
      };

      expect(getAppModuleFromRouteConfig(routeConfigWithNotExistingAppModule)).toBeNull();


    });

    it("returns null in case app module name is empty", () => {

      const routeConfigWithNotExistingAppModule: RouteConfig = {
        ...routeConfig,
        routeStack: [
          {
            ...routeConfig.routeStack[0],
            props: {
              ...routeConfig.routeStack[0].props,
              name: undefined
            }
          }
        ]
      };

      expect(getAppModuleFromRouteConfig(routeConfigWithNotExistingAppModule)).toBeNull();

    });

    it("returns null in case rootstack is empty", () => {

      const routeConfigWithNotExistingAppModule: RouteConfig = {
        ...routeConfig,
        routeStack: []
      };

      expect(getAppModuleFromRouteConfig(routeConfigWithNotExistingAppModule)).toBeNull();


    });

  });

});
