import {
  createUpdateTranslationAction,
  updateTranslationActionType,
  UpdateTranslationsAction
} from "../translation";
import { Locale } from "../../../_common/i18n/IntlProvider";
import { loadMessages } from "../../../_common/i18n/message/translations";

describe("Translation action creators", () => {

  describe("createUpdateTranslationAction", () => {

    it("loads translations and creates action", () => {

      const locale = Locale.de;
      const actionExpected: UpdateTranslationsAction = {
        type: updateTranslationActionType,
        locale,
        messages: loadMessages(locale).messages
      };

      const actionReturned = createUpdateTranslationAction(locale);

      expect(actionReturned).toEqual(actionExpected);

    });

  });


  
});
