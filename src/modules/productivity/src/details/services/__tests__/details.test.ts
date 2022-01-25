import { isBelowThreshold, determineColor } from "../details";
import { colors } from "../../../../../../_common/styles/global";

describe("Service: Details", () => {

  describe("isBelowThreshold", () => {

    it("should be falsy if not below threshold", () => {
      expect(isBelowThreshold(54, 50)).toBeFalsy();
    });

    it("should be truthy if not below threshold", () => {
      expect(isBelowThreshold(45, 50)).toBeTruthy();
    });

  });

  describe("determineColor", () => {

    it("should return teal color by default", () => {
      expect(determineColor("testRef", undefined)).toEqual(colors.teal);
    });

    it("should return radicalRed color when below threshold", () => {
      expect(determineColor("testRef", undefined, 8, 10)).toEqual(colors.radicalRed);
    });

    it("should return disabledGrey color when key matches in warnings", () => {
      const warnings = [
        "PERFORMANCE_MEASUREMENT_OUTDATED",
        "AVAILABILITY_MEASUREMENT_OUTDATED"
      ];
      expect(determineColor("PERFORMANCE_MEASUREMENT_OUTDATED", warnings, 8, 10)).toEqual(colors.disabledGrey);
    });

    it("should return radicalRed color when key doesn't matches in warnings and is below threshold", () => {
      const warnings = [
        "PERFORMANCE_MEASUREMENT_OUTDATED",
        "AVAILABILITY_MEASUREMENT_OUTDATED"
      ];
      expect(determineColor("ref_key", warnings, 8, 10)).toEqual(colors.radicalRed);
    });

    it("should return default color when key doesn't matches in warnings", () => {
      const warnings = [
        "PERFORMANCE_MEASUREMENT_OUTDATED",
        "AVAILABILITY_MEASUREMENT_OUTDATED"
      ];
      expect(determineColor("ref_key", warnings)).toEqual(colors.teal);
    });

  });
});
