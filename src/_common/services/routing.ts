import { AppModule } from "../models/module";
import { RouteConfig } from "react-onsenui";
import { RouteStackItem } from "react-onsenui";

const extractAppModule = (routeStack: RouteStackItem): AppModule | null =>
  routeStack.props && routeStack.props && routeStack.props.name && AppModule[routeStack.props.name] ?
    AppModule[routeStack.props.name]:
    null;
const isRouteStackSet = (routeConfig: RouteConfig) => routeConfig.routeStack && routeConfig.routeStack.length > 0;
export const getAppModuleFromRouteConfig = (routeConfig: RouteConfig): AppModule | null =>
  isRouteStackSet(routeConfig) ?
    extractAppModule(routeConfig.routeStack[routeConfig.routeStack.length - 1]):
    null;
