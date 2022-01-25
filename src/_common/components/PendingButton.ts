import { Button, ProgressCircular } from "react-onsenui";
import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import FormattedMessage from "../i18n/components/Formatted_Message";
import * as React from "react";

export type PendingButtonProps = {
  modifier?: string,
  disabled?: boolean,
  ripple?: boolean,
  className?: string,
  onClick?(e?: React.MouseEvent<HTMLElement>): void,
  requestPending: boolean,
  messageId: string
};

const styles = {
  button: css({
    WebkitTransform: "none"
  }),
  spinner: css({
    position: "absolute",
    left: "5%",
  })
};

const createButtonProps = (props: PendingButtonProps) => ({
  modifier: props.modifier,
  disabled: props.disabled || props.requestPending,
  ripple: props.ripple,
  className: props.className,
  onClick: props.onClick,
});


const PendingButton = (props: PendingButtonProps) =>
  h(Button, { ...createButtonProps(props), className: cx(props.className, styles.button) }, [
    props.requestPending ?
      h("div", [
        h("div", {className: styles.spinner}, [h(ProgressCircular, {  indeterminate: true }),]),
        h(FormattedMessage, { id: props.messageId })
      ]):
      h(FormattedMessage, { id: props.messageId })
  ]);

export default PendingButton;
