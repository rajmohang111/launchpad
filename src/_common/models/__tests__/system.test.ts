import {getRegionFrom, Region} from "../system";

describe("Common system model", () => {

  describe("getRegionFrom", () => {

    it("resolves to an existing region", () => {
      const expectedRegion = Region.CHINA;
      const resolvedRegion = getRegionFrom(Region.CHINA);
      expect(resolvedRegion).toEqual(expectedRegion);
    });

    it("should not resolve to an existing region and throw an error", () => {
      try {
        getRegionFrom("development");
      } catch (e) {
        const expectedError = new Error("Region not found");
        expect(e).toEqual(expectedError);
      }
    });

  });

});
