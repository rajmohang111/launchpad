import * as h from "react-hyperscript";

import { css } from "emotion";
import { colors } from "../styles/global";
import FormattedMessage from "../i18n/components/Formatted_Message";

export type FormErrorMessagesProps = {
  error: string | undefined,
  messageId: string | undefined,
  touched: boolean | undefined
};
const formErrorMessagesStyles = {
  textColor: css({
    color: colors.radicalRed
  })
};

const isFieldInError = (error: string | undefined, touched: boolean | undefined) => error && touched;

const FormErrorMessages = (props: FormErrorMessagesProps) =>
  isFieldInError(props.error, props.touched) ?
    h("div", { className: formErrorMessagesStyles.textColor }, [
      h(FormattedMessage, { id: props.messageId })
    ]) : null;

export default FormErrorMessages;
