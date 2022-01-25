import { Account, Salutation } from "../../../../../_common/models/settings";
import { AccountUpdateAction, accountUpdateActionType } from "../../../../../_common/actions/settings";
import { BootstrapAction, bootstrapActionType } from "../../../../../app/actions/bootstrap";
import {
  AccountAction,
  accountLogoutActionType,
  accountUpdateActionErrorType,
  accountUpdatePendingActionType
} from "../actions/account";
import {
  UpdateLoginRegionSuccessAction,
  updateLoginRegionSuccessActionType
} from "../../../../system/src/_actions/login";
import {
  UpdateRegistrationRegionSuccessAction,
  updateRegistrationRegionSuccessActionType
} from "../../../../system/src/_actions/registration";
import { Region } from "../../../../../_common/models/system";

export type AccountState = {
  metadata: {
    requestPending: boolean
  }
  account: Account
};

export const createAccountStateInitState = (): AccountState => ({
  metadata: {
    requestPending: false
  },
  account: {
    person: {
      firstName: "",
      lastName: "",
      salutation: Salutation.MR,
      customerNumber: ""
    },
    contact: {
      eMail: "",
      mobileNumber: ""
    },
    credential: {
      region: Region.OTHER,
      username: "",
      password: ""
    },
    metadata: {
      isEmailVerified: false,
      isActive: false,
    }
  }
});

const accountReducer = (state: AccountState = createAccountStateInitState(), action: AccountAction): AccountState => {
  switch (action.type) {
    case accountUpdateActionType:
      const accountUpdateAction = action as AccountUpdateAction;
      return {
        ...state,
        metadata: {
          requestPending: false
        },
        account: {
          ...state.account,
          person: {
            ...state.account.person,
            ...accountUpdateAction.updatedAccount.person
          },
          contact: {
            ...state.account.contact,
            ...accountUpdateAction.updatedAccount.contact
          },
          credential: {
            ...state.account.credential,
            ...accountUpdateAction.updatedAccount.credential
          },
          metadata: {
            ...state.account.metadata,
            ...accountUpdateAction.updatedAccount.metadata
          }
        }
      };
    case updateLoginRegionSuccessActionType: {
      const updateLoginRegion = action as UpdateLoginRegionSuccessAction;
      return {
        ...state,
        account: {
          ...state.account,
          credential: {
            ...state.account.credential,
            region: updateLoginRegion.region,
          }
        }
      };
    }
    case updateRegistrationRegionSuccessActionType: {
      const updateRegistrationRegion = action as UpdateRegistrationRegionSuccessAction;
      return {
        ...state,
        account: {
          ...state.account,
          credential: {
            ...state.account.credential,
            region: updateRegistrationRegion.region,
          }
        }
      };
    }
    case accountLogoutActionType:
      return createAccountStateInitState();
    case accountUpdatePendingActionType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          requestPending: true
        }
      };
    case accountUpdateActionErrorType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          requestPending: false
        }
      };
    case bootstrapActionType:
      const bootstrapAction = action as BootstrapAction;
      return {
        ...state,
        account: {
          person: bootstrapAction.deviceStore.settings.account.person,
          contact: bootstrapAction.deviceStore.settings.account.contact,
          credential: bootstrapAction.deviceStore.settings.account.credential,
          metadata: bootstrapAction.deviceStore.settings.account.metadata
        }
      };
    default:
      return state;
  }
};
export default accountReducer;
