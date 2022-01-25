import {
  LoginAction,
  loginErrorType,
  loginInvalidAccountActionType,
  loginRequestPendingType,
  loginSuccessActionType
} from "../actions/login";

export type LoginState = {
  metadata: {
    loginPending: boolean,
    resetPasswordPending: boolean
  }
};

export const createLoginInitState = (): LoginState => ({
  metadata: {
    loginPending: false,
    resetPasswordPending: false
  }
});

const loginReducer = (state = createLoginInitState(), action: LoginAction): LoginState => {
  switch (action.type) {
    case loginRequestPendingType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          loginPending: true
        }
      };
    case loginSuccessActionType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          loginPending: false
        }
      };
    case loginErrorType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          loginPending: false
        }
      };
    case loginInvalidAccountActionType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          loginPending: false
        }
      };
    default:
      return state;
  }
};

export default loginReducer;
