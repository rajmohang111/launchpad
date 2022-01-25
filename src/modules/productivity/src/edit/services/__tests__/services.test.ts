import { setRangeValue, getRangeValue ,maxValidityCheck ,minValidityCheck, getUnitLabel} from "../services";

describe("Edit Services", () => {

  describe("setRangeValue", () => {

    it("should calculate the value between 0-100 for the range input", () => {
      const value = 443;
      const maxValue = 1000;
      const rangeInput = setRangeValue(value, maxValue);
      expect(rangeInput).toEqual(44);
    });

  });

  describe("getRangeValue", () => {
    it("should fetch the original value from range output", () => {
      const output = 44;
      const maxValue = 1000;
      const rangeOut = getRangeValue(output, maxValue);
      expect(rangeOut).toEqual(4.4);
    });
  });

  describe("maxValidityCheck", () => {
    it("should check if number less than max value", () => {
      const value = 44;
      const maxValue = 100;
      const maxValidity = maxValidityCheck(value, maxValue);
      expect(maxValidity).toEqual(true);
    });
    it("should check if number greater than max value", () => {
      const value = 1323;
      const maxValue = 100;
      const maxValidity = maxValidityCheck(value, maxValue);
      expect(maxValidity).toEqual(false);
    });
    it("should check if number is NaN", () => {
      const value = NaN;
      const maxValue = 1;
      const maxValidity = maxValidityCheck(value, maxValue);
      expect(maxValidity).toBeTruthy();
    });
  });

  describe("minValidityCheck", () => {
    it("should check if number less than min value", () => {
      const value = -1;
      const minValue = 1;
      const minValidity = minValidityCheck(value, minValue);
      expect(minValidity).toEqual(false);
    });
    it("should check if number greater than min value", () => {
      const value = 4;
      const minValue = 1;
      const minValidity = minValidityCheck(value, minValue);
      expect(minValidity).toEqual(true);
    });
    it("should check if number is NaN", () => {
      const value = NaN;
      const minValue = 1;
      const minValidity = minValidityCheck(value, minValue);
      expect(minValidity).toBeTruthy();
    });
  });

  describe("getUnitLabel", () => {
    it("should return 'productivity_percent' if unit is percent", () => {
      expect(getUnitLabel("percent")).toEqual("productivity_percent");
    });

    it("should return 'productivity_metersPerHour' if unit is mh", () => {
      expect(getUnitLabel("mh")).toEqual("productivity_metersPerHour");
    });

    it("should return 'productivity_rpm' if unit is rpm", () => {
      expect(getUnitLabel("rpm")).toEqual("productivity_rpm");
    });

    it("should return unit back if no match are found", () => {
      const test = "test";
      expect(getUnitLabel(test)).toEqual(test);
    });
  });

});
