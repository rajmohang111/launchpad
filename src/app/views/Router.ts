import { RouterNavigator, Route, RouteConfig } from "react-onsenui";
import * as h from "react-hyperscript";
import { PostNavigateBackAction, PostNavigateForwardAction } from "../actions/routing";

export type RouterActions = {
  onPostPush: () => PostNavigateForwardAction,
  onPostPop: () => PostNavigateBackAction
};
export type RouterProps = {
  routeConfig: RouteConfig,
  actions: RouterActions
};

const renderPage = (route: Route) => {
  return h(route.component, route.props);
};

const Router = ({ routeConfig, actions }: RouterProps) => {
  return h(RouterNavigator, {
    routeConfig,
    renderPage,
    onPostPush: actions.onPostPush,
    onPostPop: actions.onPostPop
  });

};


export default Router;
