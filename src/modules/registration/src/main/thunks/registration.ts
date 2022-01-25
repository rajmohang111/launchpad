import { SharedAccountRestService } from "../../../../../_common/rest/models/settings";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { createNavigateBackAction } from "../../../../../app/actions/routing";
import {
  createRegistrationErrorAction,
  createRegistrationPendingAction,
  createRegistrationSuccessAction,
  RegistrationAction
} from "../actions/registration";

import {
  createShowLaunchpadToastAction,
  launchpadToastDefaultDismissId,
  MessageIdFromCalloutError
} from "../../../../../_common/components/launchpad_toast/actions/launchpad_toast";
import { LaunchpadToastType } from "../../../../../_common/models/launchpad_toast";
import { technicalUser } from "../../../../../_common/rest/models/rest";
import { determineHost } from "../../../../../_common/selectors/settings";
import { NewAccount } from "../../../../../_common/models/settings";
import { CalloutError, CalloutErrorType } from "../../../../../_common/error/error";
import {
  createMessageId,
  createMessageIdFromCalloutError, createPlaceHolderValues
} from "../../../../../_common/components/launchpad_toast/services/launchpad_toast";

export const regSuccessMessageId= "registration_success_msg";
export const userNameAlreadyExistsMessageID = "registration_username_already_exists";
export const regFailedMessageId = "registration_error_msg";


export const determineMessageIdFromCalloutError: MessageIdFromCalloutError = (error: CalloutError) => {
  switch (error.status) {
    case CalloutErrorType.conflict:
      return userNameAlreadyExistsMessageID;
    case CalloutErrorType.unauthorized:
      return regFailedMessageId;
    default:
      return createMessageIdFromCalloutError(error);
  }
};

export const createAccountAction = (newAccount: NewAccount, accountRestService: SharedAccountRestService): ThunkAction<void, RootState, void, RegistrationAction> =>
  async (dispatch: ThunkDispatch<RootState, void, RegistrationAction>): Promise<void> => {
    try {
      dispatch(createRegistrationPendingAction());
      await accountRestService.createAccount(technicalUser, newAccount, determineHost(newAccount.credential.region));
      dispatch(createShowLaunchpadToastAction(regSuccessMessageId, launchpadToastDefaultDismissId, LaunchpadToastType.info));
      dispatch(createRegistrationSuccessAction(newAccount));
      dispatch(createNavigateBackAction());
    } catch (e) {
      dispatch(createShowLaunchpadToastAction(createMessageId(e, determineMessageIdFromCalloutError), launchpadToastDefaultDismissId, LaunchpadToastType.error, createPlaceHolderValues(e)));
      dispatch(createRegistrationErrorAction(e, newAccount));
    }
  };
