import * as OnsenMock from "../../../__mocks__/react-onsenui";
jest.mock("react-onsenui", () => OnsenMock);

import { mount } from "enzyme";
import { ContentType, ToolbarProps } from "../Toolbar";
import { createToolbarNavigationElement, createToolbarRenderer, simpleToolbarCreator, ToolbarPart, completeToolbarCreator } from "../factory";
import * as h from "react-hyperscript";
import IntlProvider, { Locale } from "../../i18n/IntlProvider";
import { launchpadModuleName } from "../../i18n/message/translations";

jest.mock("react-onsenui", () => OnsenMock);


describe("Toolbar Factory", () => {

  const messages = {
    heading: "heading",
    left: "left",
    right: "right"
  };

  const toolbarProps: ToolbarProps = {
    heading: {
      type: ContentType.text,
      contentId: "heading"
    }
  };



  describe("createToolbarRenderer", () => {



    it("returns toolbar with given props", () => {

      const wrapper = mount(h(IntlProvider, { messages, locale: Locale.en }, [createToolbarRenderer(toolbarProps)()]));

      const componentExpected = h("span", messages.heading);

      expect(wrapper).not.toEqual(undefined);
      expect(wrapper.contains(componentExpected)).toEqual(true);

    });

  });

  describe("simpleToolbarCreator", () => {

    it("returns toolbar with heading", () => {

      const wrapper = mount(h(IntlProvider, { messages, locale: Locale.en }, [simpleToolbarCreator("heading")()]));

      const componentExpected = h("span", messages.heading);

      expect(wrapper).not.toEqual(undefined);
      expect(wrapper.contains(componentExpected)).toEqual(true);

    });

    it("returns toolbar with left element", () => {

      const leftElement: ToolbarPart = {
        contentId: "left",
        onClick: () => { }
      };

      const wrapper = mount(h(IntlProvider, { messages, locale: Locale.en }, [simpleToolbarCreator("heading", leftElement)()]));

      const headingExpected = h("span", messages.heading);

      expect(wrapper).not.toEqual(undefined);
      expect(wrapper.contains(headingExpected)).toEqual(true);

    });

  });

  describe("createToolbarNavigationElement", () => {

    const onClick = jest.fn();

    it("returns launchpad left element when empty contentId ", () => {

      const leftElementExpected: ToolbarPart = {
        contentId: "",
        onClick
      };

      expect(createToolbarNavigationElement(onClick)).toEqual(leftElementExpected);

    });

    
    it("returns launchpad left element when non empty contentId ", () => {

      const leftElementExpected: ToolbarPart = {
        contentId: launchpadModuleName,
        onClick
      };

      expect(createToolbarNavigationElement(onClick,launchpadModuleName)).toEqual(leftElementExpected);

    });

  });

  describe("completeToolbarCreator", () => {
    it("returns the complete toolbar", () => {
      const leftElement: ToolbarPart = {
        contentId: "left",
        onClick: () => { }
      };

      const rightElement: ToolbarPart = {
        contentId: "right",
        onClick: () => { }
      };

      const wrapper = mount(h(IntlProvider, { messages, locale: Locale.en }, [completeToolbarCreator(
        "heading",
        leftElement,
        rightElement
      )()]));

      const headingExpected = h("span", messages.heading);
      const rightElementExpected = h("span", messages.right);

      expect(wrapper).not.toEqual(undefined);
      expect(wrapper.contains(headingExpected)).toEqual(true);
      expect(wrapper.contains(rightElementExpected)).toEqual(true);
    });
  });
});
