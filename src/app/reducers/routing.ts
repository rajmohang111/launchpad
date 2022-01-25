import { Route, RouteConfig, RouterUtil } from "react-onsenui";
import Launchpad from "../../modules/launchpad/src/main/containers/Main";
import {
  navigateBackActionType,
  NavigateForwardAction,
  navigateForwardActionType,
  postNavigateBackActionType,
  postNavigateForwardActionType, NavigateWithResetAction, navigateWithResetActionType,
  RouteActions, navigateWithReplaceActionType, NavigateWithReplaceAction
} from "../actions/routing";

export type RouterState = {
  routeConfig: RouteConfig;
};

export const initRouteKey = "launchpad";
export const createRouterInitState = (initRoute: Route = { component: Launchpad, props: { key: initRouteKey } }): RouterState => ({
  routeConfig: RouterUtil.init([initRoute])
});

const routingReducer = (state = createRouterInitState(), action: RouteActions): RouterState => {
  switch (action.type) {
    case navigateForwardActionType:
      const navigateForwardAction = action as NavigateForwardAction;
      return {
        ...state,
        routeConfig: RouterUtil.push({ routeConfig: state.routeConfig, route: navigateForwardAction.route })
      };
    case postNavigateForwardActionType:
      return {
        ...state,
        routeConfig: RouterUtil.postPush(state.routeConfig)
      };
    case navigateBackActionType:
      return {
        ...state,
        routeConfig: RouterUtil.pop({ routeConfig: state.routeConfig })
      };
    case postNavigateBackActionType:
      return {
        ...state,
        routeConfig: RouterUtil.postPop(state.routeConfig)
      };
    case navigateWithResetActionType:
      const navigateWithResetAction = action as NavigateWithResetAction;
      return {
        ...state,
        routeConfig: RouterUtil.init([...navigateWithResetAction.previousRoutes, navigateWithResetAction.route])
      };
    case navigateWithReplaceActionType:
      const navigateWithReplaceAction = action as NavigateWithReplaceAction;
      return {
        ...state,
        routeConfig: RouterUtil.replace({ routeConfig: state.routeConfig, route: navigateWithReplaceAction.route })
      };
    default:
      return state;
  }
};

export default routingReducer;



