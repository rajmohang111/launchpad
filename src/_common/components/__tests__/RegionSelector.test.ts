import { mount } from "enzyme";
import * as h from "react-hyperscript";
import IntlProvider, { Locale } from "../../i18n/IntlProvider";
import RegionSelect, { createSelectOptions, shouldIncludeRegion } from "../RegionSelector";
import { Region } from "../../models/system";
import { LaunchpadSelectOptionDefinitions } from "../LaunchpadSelect";

describe("RegionSelector", () => {

  describe("shouldIncludeRegion", () => {

    it("returns true in case application is not running in production", () => {

      const shouldIncludeRegionReturned = shouldIncludeRegion(false, "DEVELOPMENT");

      expect(shouldIncludeRegionReturned).toBeTruthy();

    });

    it("returns false in case application is running in production and region is development", () => {

      const shouldIncludeRegionReturned = shouldIncludeRegion(true, "DEVELOPMENT");

      expect(shouldIncludeRegionReturned).toBeFalsy();

    });

    it("returns true in case application is running in production and region is not development", () => {

      const shouldIncludeRegionReturned = shouldIncludeRegion(true, "OTHER");

      expect(shouldIncludeRegionReturned).toBeTruthy();

    });

  });

  describe("createSelectOptions", () => {

    it("creates select options", () => {

      const selectOptionsExpected: Array<LaunchpadSelectOptionDefinitions> = [
        {
          messageId: Region.CHINA,
          value: Region.CHINA
        },
        {
          messageId: Region.OTHER,
          value: Region.OTHER
        },
        {
          messageId: Region.DEVELOPMENT,
          value: Region.DEVELOPMENT
        }
      ];

      const selectOptionsReturned = createSelectOptions(false);

      expect(selectOptionsReturned).toEqual(selectOptionsExpected);

    });

    it("filters developer and china select option", () => {

      const selectOptionsExpected: Array<LaunchpadSelectOptionDefinitions> = [
        {
          messageId: Region.OTHER,
          value: Region.OTHER
        }
      ];

      const selectOptionsReturned = createSelectOptions(true);

      expect(selectOptionsReturned).toEqual(selectOptionsExpected);

    });

  });

  describe("Selector", () => {
    const regionTranslations = {
      [Region.OTHER]: "Other",
      [Region.CHINA]: "China",
      [Region.DEVELOPMENT]: "Development"
    };


    it("renders region select options", () => {

      const wrapper = mount(
        h(IntlProvider, { messages: regionTranslations, locale: Locale.en }, [
          h(RegionSelect, { actions: { onChange: jest.fn() }, value: undefined, isProduction: false})
        ])
      );

      expect(wrapper).not.toBeUndefined();
      expect(wrapper.find("option").length).toEqual(4);
      expect(wrapper.contains(h("option", { value: Region.CHINA }, [ regionTranslations[Region.CHINA] ]))).toBeTruthy();
      expect(wrapper.contains(h("option", { value: Region.OTHER }, [ regionTranslations[Region.OTHER] ]))).toBeTruthy();
      expect(wrapper.contains(h("option", { value: Region.DEVELOPMENT }, [ regionTranslations[Region.DEVELOPMENT] ]))).toBeTruthy();
    });

    it("only renders development region in case application is running in dev mode", () => {

      const wrapper = mount(
        h(IntlProvider, { messages: regionTranslations, locale: Locale.en }, [
          h(RegionSelect, { actions: { onChange: jest.fn() }, value: undefined, isProduction: true})
        ])
      );

      expect(wrapper).not.toBeUndefined();
      expect(wrapper.find("option").length).toEqual(2);
      expect(wrapper.contains(h("option", { value: Region.OTHER }, [ regionTranslations[Region.OTHER] ]))).toBeTruthy();

    });
  });



});
