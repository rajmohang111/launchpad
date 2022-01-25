import { getDefaultTranslation, Translation } from "../../_common/i18n/message/translations";
import { TranslationActions, updateTranslationActionType, UpdateTranslationsAction } from "../actions/translation";

export type TranslationsState = Translation;

export const createTranslationsInitState = (): TranslationsState => getDefaultTranslation();

const translationReducer = (state = createTranslationsInitState(), action: TranslationActions): TranslationsState => {

  switch (action.type) {

    case updateTranslationActionType:
      const updateTranslationAction = action as UpdateTranslationsAction;
      return {
        ...state,
        locale: updateTranslationAction.locale,
        messages: updateTranslationAction.messages
      };
    default:
      return state;

  }

};

export default translationReducer;
