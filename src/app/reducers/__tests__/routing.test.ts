import { Route, RouterUtil } from "react-onsenui";
import {
  createNavigateBackAction,
  createNavigateForwardAction,
  createPostNavigateBackAction,
  createPostNavigateForwardAction,
  createNavigateWithResetAction, createNavigateWithReplaceAction
} from "../../actions/routing";
import { createTestRoute, TestComponent } from "../__testdata__/routing";
import routingReducer, { createRouterInitState, initRouteKey, RouterState } from "../routing";
import Launchpad from "../../../modules/launchpad/src/main/containers/Main";

describe("Routing Reducer", () => {

  beforeEach(() => {
    (RouterUtil.init as jest.Mock).mockClear();
    (RouterUtil.push as jest.Mock).mockClear();
    (RouterUtil.postPush as jest.Mock).mockClear();
    (RouterUtil.pop as jest.Mock).mockClear();
    (RouterUtil.postPop as jest.Mock).mockClear();
  });

  const state = createRouterInitState();
  const route = createTestRoute();

  describe("createRouterInitState", () => {

    it("returns default init state in case not given", () => {

      const routeExpected: Route = {
        component: Launchpad,
        props: {
          key: initRouteKey
        }
      };

      createRouterInitState();
      expect(RouterUtil.init).toHaveBeenCalledWith([routeExpected]);

    });

  });

  describe("navigateForwardAction", () => {


    const navigateForwardAction = createNavigateForwardAction(route);

    it("updates router config", () => {

      const updatedRouteConfig = {
        ...state.routeConfig,
        props: {
          key: "updated"
        }
      };

      (RouterUtil.push as jest.Mock).mockReturnValue(updatedRouteConfig);

      const stateReturned = routingReducer(state, navigateForwardAction);

      expect(stateReturned.routeConfig).toEqual(updatedRouteConfig);
      expect(RouterUtil.push).toHaveBeenCalledWith({ routeConfig: state.routeConfig, route: navigateForwardAction.route });
    });

  });

  describe("postNavigateForwardActionType", () => {

    const postNavigationAction = createPostNavigateForwardAction();

    it("calls postPush on RouterUtil and updates state", () => {

      expect(routingReducer(state, postNavigationAction)).toEqual(state);

      expect(RouterUtil.postPush).toHaveBeenCalledWith(state.routeConfig);

    });


  });

  describe("navigateBackAction", () => {

    const navigateBackAction = createNavigateBackAction();

    it("call pop on RouterUtil and updates state", () => {

      expect(routingReducer(state, navigateBackAction)).toEqual(state);
      expect(RouterUtil.pop).toHaveBeenCalledWith({ routeConfig: state.routeConfig });

    });


  });

  describe("postNavigateBackActionType", () => {

    const postNavigateBackAction = createPostNavigateBackAction();

    it("calls post and updates state", () => {

      expect(routingReducer(state, postNavigateBackAction)).toEqual(state);
      expect(RouterUtil.postPop).toHaveBeenCalledWith(state.routeConfig);

    });

  });

  describe("navigateWithResetActionType", () => {

    const previousRouteTemplate: Route = {
      component: TestComponent,
      props: {
        key: "previous"
      }
    };
    const previousRoutes = [previousRouteTemplate];

    it("resets router to provided route", () => {

      const resettedConfig = {
        ...state.routeConfig,
        props: {
          key: "reset"
        }
      };
      (RouterUtil.init as jest.Mock).mockReturnValue(resettedConfig);
      const resetNavigationAction = createNavigateWithResetAction(createTestRoute(), previousRoutes);

      const stateExpected: RouterState = {
        ...state,
        routeConfig: resettedConfig
      };

      expect(routingReducer(state, resetNavigationAction)).toEqual(stateExpected);
      expect(RouterUtil.init).toHaveBeenCalledWith([...previousRoutes, route]);
    });

  });

  describe("navigateWithReplaceActionType", () => {

    it("replaces current route", () => {

      const replacedRouteConfig = {
        ...state.routeConfig,
        props: {
          key: "replaced"
        }
      };
      const replaceNavigationAction = createNavigateWithReplaceAction(route);
      const stateExpected: RouterState = {
        ...state,
        routeConfig: replacedRouteConfig
      };

      (RouterUtil.replace as jest.Mock).mockReturnValue(replacedRouteConfig);

      expect(routingReducer(state, replaceNavigationAction)).toEqual(stateExpected);
      expect(RouterUtil.replace).toHaveBeenCalledWith({ routeConfig: state.routeConfig, route: replaceNavigationAction.route });

    });

  });

});
