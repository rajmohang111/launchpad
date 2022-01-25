jest.mock("../../../locale/locale");
import { getLocale } from "../../../locale/locale";

import { getDefaultTranslation, loadMessages } from "../translations";

describe("Translations", () => {

  describe("loadMessages", () => {

    it("loads messages for given locale", async () => {

      const loadedMessages = await loadMessages("de");

      expect(loadedMessages).not.toEqual(undefined);
      expect(loadedMessages.locale).toEqual("de");

    });

    it("loads en messages in case no locale is provided", async () => {

      const loadedMessages = await loadMessages();

      expect(loadedMessages).not.toEqual(undefined);
      expect(loadedMessages.locale).toEqual("en");

    });

    it("loads en messages in case loading of given locale fails", async () => {

      const loadedMessages = await loadMessages("doesNotExist");

      expect(loadedMessages).not.toEqual(undefined);
      expect(loadedMessages.locale).toEqual("en");

    });


  });

  describe("getDefaultTranslation", () => {

    it("returns translation for user set locale exact match", () => {

      (getLocale as jest.Mock).mockReturnValue("de");

      expect(getDefaultTranslation().locale).toEqual("de");

    });

    it("returns translation for user set locale contains match", () => {

      (getLocale as jest.Mock).mockReturnValue("de_DE");

      expect(getDefaultTranslation().locale).toEqual("de");

    });

    it("returns en locale in case selected locale is not available", () => {

      (getLocale as jest.Mock).mockReturnValue("fr");

      expect(getDefaultTranslation().locale).toEqual("en");

    });

  });

});
