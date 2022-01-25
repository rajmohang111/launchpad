import { Action } from "redux";
import { Route } from "react-onsenui";

type RouteAction = {
  route: Route
};

export type NavigateForwardAction = Action & RouteAction;
export type PostNavigateForwardAction = Action;

export type NavigateBackAction = Action;
export type PostNavigateBackAction = Action;

export type NavigateWithResetAction = Action & RouteAction  & {
  previousRoutes: Array<Route>;
};

export type NavigateWithReplaceAction = Action & RouteAction;

export type RouteActions =
  NavigateForwardAction |
  PostNavigateForwardAction |
  NavigateBackAction |
  PostNavigateBackAction |
  NavigateWithResetAction;

export const navigateForwardActionType = "NAVIGATE_FORWARD";
export const postNavigateForwardActionType = "POST_NAVIGATE_FORWARD";

export const navigateBackActionType = "NAVIGATE_BACK";
export const postNavigateBackActionType = "POST_NAVIGATE_BACK";

export const navigateWithResetActionType = "NAVIGATE_WITH_RESET";
export const navigateWithReplaceActionType = "NAVIGATE_WITH_REPLACE";


export const createNavigateForwardAction = (route: Route): NavigateForwardAction => ({
  type: navigateForwardActionType,
  route
});

export const createPostNavigateForwardAction = (): PostNavigateForwardAction => ({
  type: postNavigateForwardActionType
});

export const createNavigateBackAction = (): NavigateBackAction => ({
  type: navigateBackActionType
});

export const createPostNavigateBackAction = (): PostNavigateBackAction => ({
  type: postNavigateBackActionType
});

export const createNavigateWithResetAction = (route: Route, previousRoutes: Array<Route> = []): NavigateWithResetAction => ({
  type: navigateWithResetActionType,
  route,
  previousRoutes
});

export const createNavigateWithReplaceAction = (route: Route): NavigateWithReplaceAction => ({
  type: navigateWithReplaceActionType,
  route
});
