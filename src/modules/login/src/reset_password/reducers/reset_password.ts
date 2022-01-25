import {
  resetPasswordErrorActionType,
  resetPasswordPendingActionType,
  resetPasswordSuccessActionType,
  ResetPasswordAction
} from "../actions/reset_password";

export type ResetPasswordState = {
  metadata: {
    resetPasswordPending: boolean
  }
};

export const createResetPasswordInitState = (): ResetPasswordState => ({
  metadata: {
    resetPasswordPending: false
  }
});

const resetPasswordReducer = (state = createResetPasswordInitState(), action: ResetPasswordAction): ResetPasswordState => {
  switch (action.type) {
    case resetPasswordPendingActionType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          resetPasswordPending: true
        }
      };
    case resetPasswordSuccessActionType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          resetPasswordPending: false
        }
      };
    case resetPasswordErrorActionType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          resetPasswordPending: false
        }
      };
    default:
      return state;
  }
};

export default resetPasswordReducer;
