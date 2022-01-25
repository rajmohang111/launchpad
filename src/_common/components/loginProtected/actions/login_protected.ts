import { AppModule, createModuleSelectionWithRedirect } from "../../../models/module";
import { createNavigateWithReplaceAction, NavigateWithReplaceAction } from "../../../../app/actions/routing";
import { fromModuleSelection } from "../../../routing/routing";

export type LoginProtectedAction = NavigateWithReplaceAction;


export const createNavigateToLoginAction = (selectedModule: AppModule): NavigateWithReplaceAction =>
  createNavigateWithReplaceAction(
    fromModuleSelection(createModuleSelectionWithRedirect(AppModule.login, selectedModule))
  );
