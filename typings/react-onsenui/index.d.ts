import * as React from "react";

declare module "react-onsenui" {
  export class RouterNavigator extends React.Component<any, any> {}
  export class RouterUtil {
    static init(params: Array<Route>): RouteConfig;
    static push(param: { routeConfig: RouteConfig, route: Route }): RouteConfig;
    static postPush(routeConfig: RouteConfig): RouteConfig;
    static pop(param: { routeConfig: RouteConfig }): RouteConfig;
    static postPop(routeConfig: RouteConfig): RouteConfig;
    static reset(param: { routeConfig: RouteConfig, route: Route }): RouteConfig;
    static replace(param: { routeConfig: RouteConfig, route: Route }): RouteConfig;
  }

  export type RouteStackItem<P extends RouteProps = RouteProps> = {
    props: P
  };

  export type RouteConfig = {
    routeStack: Array<RouteStackItem>,
    processStack: any;
  };

  export type RouteProps = {
    key: string;
    name?: string
  };
  export type Route<P extends RouteProps = RouteProps> = {
    component: React.ComponentType;
    props: P;
  };

}
