import {
  RegistrationAction, registrationErrorActionType,
  registrationPendingActionType,
  registrationSuccessActionType
} from "../actions/registration";

export type RegistrationState = {
  metadata: {
    requestPending: boolean
  }
};

export const createRegistrationInitState = (): RegistrationState => ({
  metadata: {
    requestPending: false
  }
});

const registrationReducer = (state = createRegistrationInitState(), action: RegistrationAction): RegistrationState => {
  switch (action.type) {
    case registrationPendingActionType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          requestPending: true
        }
      };
    case registrationSuccessActionType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          requestPending: false
        }
      };
    case registrationErrorActionType:
      return {
        ...state,
        metadata: {
          ...state.metadata,
          requestPending: false
        }
      };
    default:
      return state;
  }
};

export default registrationReducer;
