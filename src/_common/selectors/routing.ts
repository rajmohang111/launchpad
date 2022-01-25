import { createSelector, Selector } from "reselect";
import { RootState } from "../../main/reducers/main";
import { RouteConfig } from "react-onsenui";
import { getGlobalState } from "./global";

export const getRouteConfig: Selector<RootState, RouteConfig> = createSelector(
  [getGlobalState],
  global => global.routing.routeConfig
);
