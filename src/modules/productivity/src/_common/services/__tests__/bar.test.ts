import { getBarContainerColor, getBarColor, getTextColor } from "../bar";
import { cx } from "emotion";
import { BarColorProps } from "../../components/Bar";

describe("Service: Bar", () => {

  const css = "defaultCss";
  const critical = "criticalCss";
  const disabled = "disabledCss";

  describe("getBarContainerColor", () => {

    it("should return default css if the fill is not zero", () => {
      expect(getBarContainerColor(20, css, critical)).toEqual(cx(css));
    });

    it("should return critical css if the fill is zero", () => {
      expect(getBarContainerColor(0, css, critical)).toEqual(cx(css, critical));
    });

  });

  describe("getBarColor", () => {

    it("should return default css if the fill is not zero", () => {
      expect(getBarColor(css, critical, { fillLevel: 20 } as BarColorProps)).toEqual(cx(css));
    });

    it("should return critical css if the fill is zero", () => {
      expect(getBarColor(css, critical, { fillLevel: 0 } as BarColorProps)).toEqual(cx(css, critical));
    });

  });

  describe("getTextColor", () => {

    it("should return css by default", () => {
      expect(getTextColor(css, critical, disabled, { fillLevel: 200, targetLevel: 112, disabled: false })).toEqual(cx(css));
    });

    it("should return critical css if the fill is zero", () => {
      expect(getTextColor(css, critical, disabled, { fillLevel: 0, targetLevel: 112, disabled: false })).toEqual(cx(css, critical));
    });

    it("should return critical css if less than threshold", () => {
      expect(getTextColor(css, critical, disabled, { fillLevel: 20, targetLevel: 112, disabled: false })).toEqual(cx(css, critical));
    });

    it("should return disabled css if disabled", () => {
      expect(getTextColor(css, critical, disabled, { fillLevel: 20, targetLevel: 112, disabled: true })).toEqual(cx(css, disabled));
    });

  });

});
