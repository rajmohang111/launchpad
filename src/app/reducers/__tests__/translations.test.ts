import { createTranslationsInitState, default as translationReducer, TranslationsState } from "../translations";
import { getDefaultTranslation, loadMessages } from "../../../_common/i18n/message/translations";
import { Locale } from "../../../_common/i18n/IntlProvider";
import { createUpdateTranslationAction } from "../../actions/translation";

describe("Translations Reducer", () => {

  const state: TranslationsState = createTranslationsInitState();

  describe("createTranslationsInitState", () => {

    it("create translation init state", () => {

      expect(createTranslationsInitState()).toEqual(getDefaultTranslation());

    });

  });

  describe("createUpdateTranslationAction", () => {

    const locale = Locale.de;
    const messages = loadMessages(locale).messages;

    it("updates locale and messages", () => {

      const stateExpected: TranslationsState = {
        ...state,
        locale,
        messages
      };

      expect(translationReducer(state, createUpdateTranslationAction(locale))).toEqual(stateExpected);

    });

  });

});
