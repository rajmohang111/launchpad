import * as React from "react";
import { I18N, InjectedI18NProps } from "../I18N";
import { mount } from "enzyme";
import IntlProvider, { Locale } from "../../IntlProvider";

describe("I18N Hoc", () => {

  const messages = {
    translatedId: "translated text"
  };

  const TestComponent = (props: InjectedI18NProps) =>
    React.createElement(
      "div",
      undefined,
      `Translated Text: ${props.intl.formatMessage("translatedId", undefined, "should not be displayed")}`
    );



  it("passes intl props to rendered component", () => {

    const ComponentWithIntl = React.createElement(
      IntlProvider,
      { messages, locale: Locale.en },
      React.createElement(
        I18N,
        { component: TestComponent },
        null
      )
    );

    const elementExpected = React.createElement(
      "div",
      undefined,
      `Translated Text: ${messages.translatedId}`

    );

    const wrapper = mount(ComponentWithIntl);

    expect(wrapper).not.toEqual(undefined);
    expect(wrapper.contains(elementExpected)).toEqual(true);
  });


});
