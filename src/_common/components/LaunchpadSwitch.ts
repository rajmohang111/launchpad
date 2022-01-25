import * as h from "react-hyperscript";
import { css, cx } from "emotion";

export type LaunchpadSwitchProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

const launchpadSwitchStyles = {
  switchInput: css({
    zIndex: 1
  })
};

const LaunchpadSwitch = (props: LaunchpadSwitchProps) =>
  h("label", { className: "switch switch--material" }, [
    h("input",
      {
        ...props,
        type: "checkbox",
        className: cx("switch__input switch--material__input", launchpadSwitchStyles.switchInput),
        onChange: () => props.onChange(!props.checked)
      }),
    h("div", { className: "switch__toggle switch--material__toggle" }, [
      h("div", { className: "switch__handle switch--material__handle" })
    ])
  ]);

export default LaunchpadSwitch;
