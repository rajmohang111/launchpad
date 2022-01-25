import * as React from "react";

import { PlaceHolderValues } from "../format_message";
import { I18N, InjectedI18NProps } from "./I18N";


export type FormattedMessageProps = {
  id: string;
  defaultMessage?: string;
  values?: PlaceHolderValues;
  onClick?(e?: React.MouseEvent<HTMLElement>): void;
};



const formattedMessageCreator = (props: FormattedMessageProps) => (i18n: InjectedI18NProps) =>
  React.createElement(
    "span",
    { onClick: props.onClick },
    i18n.intl.formatMessage(
      props.id,
      props.values,
      props.defaultMessage
    )
  );

const FormattedMessage = (props: FormattedMessageProps) =>
  React.createElement(
    I18N,
    { component: formattedMessageCreator(props) }
  );

export default FormattedMessage;
