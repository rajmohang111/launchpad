import * as moment from "moment";
import { createFormatDate, createFormatFullDate, createFormatTimeOfDay } from "../format_date";

describe("format date", () => {

  const testMoment = moment();
  const localeString = "en";

  describe("createFormatDate", () => {

    it("formats for locale", () => {

      expect(createFormatDate(localeString)(moment().toISOString())).toEqual(moment(testMoment).locale(localeString).format("LL"));

    });

  });

  describe("createFormatFullDate", () => {

    it("formats for locale", () => {
      expect(createFormatFullDate(localeString)(moment().toISOString())).toEqual(moment(testMoment).locale(localeString).format("LLL"));
    });

  });

  describe("createFormatTimeOfDay", () => {

    it("formats for locale", () => {
      expect(createFormatTimeOfDay(localeString)(moment().toISOString())).toEqual(moment(testMoment).locale(localeString).format("LT"));
    });

  });



});
