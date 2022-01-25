import { calculatePollingIntervalInMilliseconds, defaultIntervalInSeconds, } from "../polling";

describe("Productivity Constants", () => {

  describe("pollingIntervalInSeconds", () => {

    it("returns interval defined", () => {

      const intervalReturned = calculatePollingIntervalInMilliseconds("10");

      expect(intervalReturned).toEqual(10 * 1000);

    });

    it("returns default interval in case nothing is defined", () => {

      const intervalReturned = calculatePollingIntervalInMilliseconds(undefined);

      expect(intervalReturned).toEqual(defaultIntervalInSeconds * 1000);

    });

    it("returns default interval in case defined interval is not a number", () => {

      const intervalReturned = calculatePollingIntervalInMilliseconds(JSON.stringify("wrong"));

      expect(intervalReturned).toEqual(defaultIntervalInSeconds * 1000);

    });

  });

});
