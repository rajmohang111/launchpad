import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import LaunchpadSwitch from "../../../../../_common/components/LaunchpadSwitch";

const styles = {
  switcherLabel: css({
    paddingRight: "7px",
    paddingLeft: "7px"
  }),
  alignCenter: css({
    textAlign: "center"
  })
};

export type DetailsSwitchProps = {
  className?: string,
  displayMetersPerHour: boolean,
  actions: {
    onSwitchToggle: (toogle: boolean) => void,
  }
};

export const DetailsSwitch = ({ className, displayMetersPerHour, actions }: DetailsSwitchProps) =>
  h("div", { className: cx(className, styles.alignCenter) }, [
    h("label", { className: styles.switcherLabel }, [
      h(FormattedMessage, { id: "productivity_rpm", defaultMessage: "rpm" })
    ]),
    h(LaunchpadSwitch, {
      checked: displayMetersPerHour,
      onChange: actions.onSwitchToggle
    }),
    h("label", { className: styles.switcherLabel }, [
      h(FormattedMessage, { id: "productivity_metersPerHour", defaultMessage: "m/h" })
    ])
  ]);
export default DetailsSwitch;
