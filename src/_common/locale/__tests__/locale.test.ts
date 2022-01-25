import { getLocale } from "../locale";

describe("Locale", () => {

  describe("getLocale", () => {

    it("returns current locale in case navigator is available", () => {

      expect(getLocale()).not.toEqual(undefined);

    });

  });

});
