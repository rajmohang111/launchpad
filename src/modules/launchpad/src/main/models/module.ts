import { ModuleSelection } from "../../../../../_common/models/module";
import Productivity from "../../../../productivity/src/main/containers/Productivity";
import Checkparts from "../../../../checkparts/src/main/containers/Main";
import Settings from "../../../../settings/src/main/containers/Main";
import Tutorial from "../../../../tutorials/src/main/containers/Main";
import Registration from "../../../../registration/src/main/containers/Registration";

export enum ApplicationModules {
  PRODUCTIVITY = "PRODUCTIVITY",
  CHECKPARTS = "CHECKPARTS",
  SETTINGS = "SETTINGS",
  TUTORIAL = "TUTORIAL",
  REGISTRATION = "REGISTRATION"
}

export const ModuleRoutes: Record<ApplicationModules, ModuleSelection> = {
  [ApplicationModules.PRODUCTIVITY]: { component: Productivity, key: "productivity" },
  [ApplicationModules.CHECKPARTS]: { component: Checkparts, key: "checkparts" },
  [ApplicationModules.SETTINGS]: { component: Settings, key: "settings" },
  [ApplicationModules.TUTORIAL]: { component: Tutorial, key: "tutorial" },
  [ApplicationModules.REGISTRATION]: { component: Registration, key: "registration" },
};
