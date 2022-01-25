import { Route } from "react-onsenui";
import {
  createNavigateBackAction,
  createNavigateForwardAction,
  createPostNavigateBackAction,
  createPostNavigateForwardAction,
  createNavigateWithResetAction,
  NavigateBackAction,
  navigateBackActionType,
  NavigateForwardAction,
  navigateForwardActionType,
  PostNavigateBackAction,
  postNavigateBackActionType,
  PostNavigateForwardAction,
  postNavigateForwardActionType,
  NavigateWithResetAction,
  navigateWithResetActionType,
  NavigateWithReplaceAction,
  navigateWithReplaceActionType, createNavigateWithReplaceAction
} from "../routing";
import { TestComponent } from "../../reducers/__testdata__/routing";


describe("Routing Actions", () => {

  const route: Route = {
    component: TestComponent,
    props: {
      key: "testComponent"
    }
  };

  const navigateForwardActon: NavigateForwardAction = {
    type: navigateForwardActionType,
    route
  };


  describe("createNavigateForwardAction", () => {

    it("creates forward navigation action", () => {

      expect(createNavigateForwardAction(route)).toEqual(navigateForwardActon);
    });

  });

  describe("createPostNavigateForwardAction", () => {

    it("creates post navigation action", () => {

      const postActionExpected: PostNavigateForwardAction = {
        type: postNavigateForwardActionType
      };

      expect(createPostNavigateForwardAction()).toEqual(postActionExpected);

    });

  });

  describe("createNavigateBackAction", () => {

    it("creates navigate back action", () => {

      const backActionExpected: NavigateBackAction = {
        type: navigateBackActionType
      };

      expect(createNavigateBackAction()).toEqual(backActionExpected);

    });

  });

  describe("createPostNavigateBackAction", () => {

    it("creates post navigate back action", () => {

      const postBackActionExpected: PostNavigateBackAction = {
        type: postNavigateBackActionType
      };

      expect(createPostNavigateBackAction()).toEqual(postBackActionExpected);

    });

  });

  describe("createNavigateWithResetAction", () => {

    it("creates action", () => {

      const navigateWithResetActionExpected: NavigateWithResetAction = {
        type: navigateWithResetActionType,
        route,
        previousRoutes: []
      };

      expect(createNavigateWithResetAction(route)).toEqual(navigateWithResetActionExpected);

    });

    it("creates action with previous routes", () => {

      const previousRoutes = [route, route];

      const navigateWithResetActionExpected: NavigateWithResetAction = {
        type: navigateWithResetActionType,
        route,
        previousRoutes
      };

      expect(createNavigateWithResetAction(route, previousRoutes)).toEqual(navigateWithResetActionExpected);

    });

  });

  describe("createNavigateWithReplaceAction", () => {

    it("creates action", () => {

      const replaceActionExpected: NavigateWithReplaceAction = {
        type: navigateWithReplaceActionType,
        route
      };

      expect(createNavigateWithReplaceAction(route)).toEqual(replaceActionExpected);

    });

  });


});
