import * as h from "react-hyperscript";
import { Toast } from "react-onsenui";
import FormattedMessage from "../../../i18n/components/Formatted_Message";
import { LaunchpadToastState } from "../reducers/launchpad_toast";
import { HideLaunchpadToastAction } from "../actions/launchpad_toast";
import Ionicon from "react-ionicons";
import {colors} from "../../../styles/global";
import {css} from "emotion";
import { LaunchpadToastType } from "../../../models/launchpad_toast";

export type LaunchpadToastViewProps = {
  launchpadToastState: LaunchpadToastState,
  actions: {
    onHideLaunchpadToast: () => HideLaunchpadToastAction;
  }
};
const styles = {
  errorToast: css({
    "& .toast": {
      backgroundColor: colors.radicalRed
    }
  }),
  infoToast: css({
    "& .toast": {
      backgroundColor: colors.pelorous
    }
  }),
  toastIcon: css({
    marginRight: "6px",
    fontSize: "14px"

  })
};

const toastStyleFromType = (type: LaunchpadToastType) => {
  switch (type) {
    case LaunchpadToastType.error:
      return styles.errorToast;
    default:
      return styles.infoToast;
  }
};

const iconClassFromType = (type: LaunchpadToastType) => {
  switch (type) {
    case LaunchpadToastType.error:
      return "md-warning";
    default:
      return "md-information-circle";
  }
};

const LaunchpadToastView = (props: LaunchpadToastViewProps) =>
  props.launchpadToastState.metadata.isOpen ?
    h(Toast, { className: toastStyleFromType(props.launchpadToastState.toastType), isOpen: props.launchpadToastState.metadata.isOpen }, [
      h("div", { className: styles.toastIcon }, [
        h(Ionicon, {icon: iconClassFromType(props.launchpadToastState.toastType), fontSize: "22px", color: colors.white}),
      ]),
      h("div", { className: "toast__message" }, [
        h(FormattedMessage, { id: props.launchpadToastState.messageId, values: props.launchpadToastState.placeHolders })
      ]),
      h("div", { className: "toast__button", onClick: props.actions.onHideLaunchpadToast }, [
        h(Ionicon, {icon: "md-close", fontSize: "24px", color: colors.white})
      ])
    ]):
    null;

export default LaunchpadToastView;
