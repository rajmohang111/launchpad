import {
  hideLaunchpadShowActionType,
  LaunchpadToastAction,
  ShowLaunchpadToastAction,
  showLaunchpadToastActionType
} from "../actions/launchpad_toast";
import { LaunchpadToastType } from "../../../models/launchpad_toast";
import { PlaceHolderValues } from "../../../i18n/format_message";

export type LaunchpadToastState = {
  metadata: {
    isOpen: boolean
  }
  messageId: string,
  placeHolders: PlaceHolderValues,
  dismissId: string,
  toastType: LaunchpadToastType
};

export const createLaunchpadToastInitState = (): LaunchpadToastState => ({
  metadata: {
    isOpen: false
  },
  messageId: "",
  placeHolders: {},
  dismissId: "",
  toastType: LaunchpadToastType.error
});

const launchpadToastReducer = (state = createLaunchpadToastInitState(), action: LaunchpadToastAction): LaunchpadToastState => {
  switch (action.type) {
    case showLaunchpadToastActionType:
      const showAction = action as ShowLaunchpadToastAction;
      return {
        ...state,
        metadata: {
          ...state.metadata,
          isOpen: true
        },
        messageId: showAction.messageId,
        placeHolders: showAction.placeHolderValues,
        dismissId: showAction.dismissId,
        toastType: showAction.toastType
      };
    case hideLaunchpadShowActionType:
      return createLaunchpadToastInitState();
    default:
      return state;

  }
};

export default launchpadToastReducer;
