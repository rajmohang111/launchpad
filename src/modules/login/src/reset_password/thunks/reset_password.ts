import { Region } from "../../../../../_common/models/system";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { SharedAccountDeviceStore } from "../../../../../_common/stores/settings";
import { SharedAccountRestService } from "../../../../../_common/rest/models/settings";
import {
  createResetPasswordErrorAction,
  createResetPasswordPendingAction, createResetPasswordSuccessAction,
  ResetPasswordAction
} from "../actions/reset_password";
import { determineHost } from "../../../../../_common/selectors/settings";
import { technicalUser } from "../../../../../_common/rest/models/rest";
import { createShowLaunchpadToastAction, launchpadToastDefaultDismissId } from "../../../../../_common/components/launchpad_toast/actions/launchpad_toast";
import { determineMessageIdFromCalloutError } from "../../../../registration/src/main/thunks/registration";
import { LaunchpadToastType } from "../../../../../_common/models/launchpad_toast";
import { logout } from "../../../../../_common/services/settings";
import { createNavigateBackAction } from "../../../../../app/actions/routing";
import { createMessageId } from "../../../../../_common/components/launchpad_toast/services/launchpad_toast";

export const passwordResetSuccessMessageId = "reset_password_success_msg";


export const resetPassword = (email: string, region: Region,
  accountRestService: SharedAccountRestService,
  accountDeviceStore: SharedAccountDeviceStore): ThunkAction<void, RootState, void, ResetPasswordAction> =>
  async (dispatch: ThunkDispatch<RootState, void, ResetPasswordAction>) => {
    try {
      dispatch(createResetPasswordPendingAction());
      await logout(accountDeviceStore);
      await accountRestService.resetPassword(email, determineHost(region), technicalUser);
      dispatch(createShowLaunchpadToastAction(passwordResetSuccessMessageId, launchpadToastDefaultDismissId, LaunchpadToastType.info));
      dispatch(createResetPasswordSuccessAction(email));
      dispatch(createNavigateBackAction());
    } catch (e) {
      dispatch(createShowLaunchpadToastAction(createMessageId(e, determineMessageIdFromCalloutError), launchpadToastDefaultDismissId, LaunchpadToastType.error));
      dispatch(createResetPasswordErrorAction(email, e));
    }
  };
