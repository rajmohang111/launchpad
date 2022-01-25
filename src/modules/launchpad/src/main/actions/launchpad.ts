import { Action } from "redux";
import { createNavigateForwardAction } from "../../../../../app/actions/routing";
import {
  AppModule,
  createModuleSelection,
  createModuleSelectionWithRedirect
} from "../../../../../_common/models/module";
import { fromModuleSelection } from "../../../../../_common/routing/routing";

export interface ModuleSelectAction extends Action {
  payload: AppModule;
}

export type LaunchPadActions = ModuleSelectAction;

export const createModuleSelectionAction = (selectedModule: AppModule, redirectModule?: AppModule) => {

  const moduleSelection = redirectModule ?
    createModuleSelectionWithRedirect(selectedModule, redirectModule):
    createModuleSelection(selectedModule);
  return createNavigateForwardAction(
    fromModuleSelection(moduleSelection)
  );
};

