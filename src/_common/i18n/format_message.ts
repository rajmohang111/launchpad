import { isEmpty, not, pipe } from "ramda";
import { fromNullable } from "fp-ts/lib/Option";

export type Messages = Record<string, string>;

export type PlaceHolderValues = {
  [key: string]: string
};

export type FormatMessage = (
  messageId: string,
  values?: PlaceHolderValues,
  defaultMessage?: string
) => string;

const onEmptyMessage = (messageId: string, defaultMessage?: string) => () => {
  console.error(`Could not resolve i18n message id "${messageId}".`);

  return defaultMessage || messageId;
};

const fillPlaceHolders = (message: string, placeHolderValues: PlaceHolderValues) => Object.keys(placeHolderValues).reduce(
  (definedMessage, currentKey) => definedMessage.replace(new RegExp(`{${currentKey}}`, "g"), placeHolderValues[currentKey]),
  message
);

const formatMessage = (messages: Messages): FormatMessage => (
  messageId: string,
  values: PlaceHolderValues = {},
  defaultMessage?: string
): string => {

  return fromNullable(messages[messageId])
    .map(messages =>
      fromNullable(values)
        .filter(pipe(isEmpty, not))
        .map(values => fillPlaceHolders(messages, values))
        .getOrElse(messages)
    ).getOrElseL(onEmptyMessage(messageId, defaultMessage));
};

export default formatMessage;
