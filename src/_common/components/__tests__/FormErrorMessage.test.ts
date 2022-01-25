import { mount } from "enzyme";
import FormErrorMessages from "../FormErrorMessages";
import * as h from "react-hyperscript";
import IntlProvider, { Locale } from "../../i18n/IntlProvider";

describe("FormErrorMessage", () => {

  const error = "testError";
  const messageId = "testErrorMessageId";
  it("renders error message", () => {

    const wrapper = mount(
      h(IntlProvider, { messages: {}, locale: Locale.en }, [
        h(FormErrorMessages, { error, messageId, touched: true })
      ])
    );

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.find("span").exists()).toEqual(true);

  });

  it("does not render error message in case error is undefined", () => {

    const wrapper = mount(
      h(IntlProvider, { messages: {}, locale: Locale.en }, [
        h(FormErrorMessages, { error: undefined, messageId, touched: false })
      ])
    );

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.find("span").exists()).toEqual(false);

  });

  it("does not render error message in case error field has not been touched", () => {

    const wrapper = mount(
      h(IntlProvider, { messages: {}, locale: Locale.en }, [
        h(FormErrorMessages, { error, messageId, touched: false })
      ])
    );

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.find("span").exists()).toEqual(false);

  });

});
