import { createNavigateWithResetAction, NavigateWithResetAction } from "../../../../app/actions/routing";
import { fromModuleSelection } from "../../../routing/routing";
import { AppModule, AppModuleRoutes, createModuleSelection } from "../../../models/module";

export type ModuleMenuAction = NavigateWithResetAction;

export const createNavigateToHomeAction = (): NavigateWithResetAction =>
  createNavigateWithResetAction(fromModuleSelection(AppModuleRoutes[AppModule.launchpad]));

export const createNavigateToModuleAction = (selectedAppModule: AppModule): NavigateWithResetAction =>
  createNavigateWithResetAction(
    fromModuleSelection(createModuleSelection(selectedAppModule)),
    [
      fromModuleSelection(createModuleSelection(AppModule.launchpad))
    ]
  );
