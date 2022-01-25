import { ModuleSelection } from "../models/module";
import { Route } from "react-onsenui";
import * as uuid from "uuid/v4";

export const fromModuleSelection = (moduleSelection: ModuleSelection): Route => ({
  component: moduleSelection.component,
  props: {
    key: `${moduleSelection.key}:${uuid()}`,
    name: moduleSelection.key,
    ...moduleSelection.props
  }
});
