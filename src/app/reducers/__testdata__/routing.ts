import * as h from "react-hyperscript";
import { Route } from "react-onsenui";

export const TestComponent = () => h("div", "test");

export const createTestRoute = (): Route => ({
  component: TestComponent,
  props: {
    key: "testComponent"
  }
});
