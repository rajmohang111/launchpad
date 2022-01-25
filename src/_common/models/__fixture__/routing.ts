import { RouteConfig } from "react-onsenui";
import { AppModule } from "../module";
import * as uuid from "uuid/v4";

export const createRouteConfigFixture = (): RouteConfig => ({
  routeStack: [
    {
      props: {
        key: `${AppModule.launchpad}:${uuid()}`,
        name: AppModule.launchpad
      }
    }
  ],
  processStack: []
});
