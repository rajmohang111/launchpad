import { createNavigateForwardAction, RouteActions } from "../../../../../app/actions/routing";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { createSettingsModuleSelection, SettingsModule } from "../models/module";
import { fromModuleSelection } from "../../../../../_common/routing/routing";
import { Dispatch } from "redux";
import { LaunchPadErrorAction } from "../../../../../_common/actions/error";
import { AccountAction } from "../../account/actions/account";
import { Credential } from "../../../../../_common/rest/models/rest";

export const settingsMainErrorActionType = "SETTINGS_MAIN_ERROR";

export type MainErrorAction = LaunchPadErrorAction;

export type MainAction = RouteActions;

export const createSettingsSelectionAction = (selectedModule: SettingsModule) =>
  createNavigateForwardAction(
    fromModuleSelection(createSettingsModuleSelection(selectedModule))
  );

export const createSelectAccountModuleAction = (credential: Credential): ThunkAction<void, RootState, void, AccountAction> =>
  async (dispatch: Dispatch): Promise<void> => {

    try {
      dispatch(createSettingsSelectionAction(SettingsModule.ACCOUNT));
    } catch (e) {
      dispatch({
        type: settingsMainErrorActionType,
        error: e
      } as MainErrorAction);
    }

  };

