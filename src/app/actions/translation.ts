import { Action } from "redux";
import { Messages } from "../../_common/i18n/format_message";
import { Locale } from "../../_common/i18n/IntlProvider";
import { loadMessages } from "../../_common/i18n/message/translations";

export interface UpdateTranslationsAction extends Action {
  locale: Locale;
  messages: Messages;
}

export type TranslationActions = UpdateTranslationsAction;

export const updateTranslationActionType = "updateTranslationActionType";

export const createUpdateTranslationAction = (locale: Locale): UpdateTranslationsAction => {

  const messages = loadMessages(locale).messages;

  return {
    type: updateTranslationActionType,
    locale,
    messages
  };

};
