import * as h from "react-hyperscript";
import { mount } from "enzyme";
import LaunchpadSelect, { emptySelectionMessageId, LaunchpadSelectOptionDefinitions } from "../LaunchpadSelect";
import IntlProvider, { Locale } from "../../i18n/IntlProvider";

describe("LaunchpadSelect", () => {

  const selectOptions: Array<LaunchpadSelectOptionDefinitions> = [
    {
      messageId: "option1",
      value: "option1"
    },
    {
      messageId: "option2",
      value: "option2"
    }
  ];


  const translatedMessages = selectOptions.reduce((messages, currentMessage) => ({
    ...messages,
    ...currentMessage,
  }), {});


  
  it("renders select options without translation", () => {

    const wrapper = mount(
      h(IntlProvider, { messages: translatedMessages, locale: Locale.en }, [
        h(LaunchpadSelect, { selectOptions, value: selectOptions[0].value, onChange: jest.fn(), name: "test", translatable:false })
      ])
    );

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.contains(h("option", { value: "option1" }, [ "option1" ]))).toBeTruthy();
    expect(wrapper.contains(h("option", { value: "option2" }, [ "option2" ]))).toBeTruthy();


  });


  it("renders empty option in case no value is provided", () => {

    const translatedMessagesWithEmtpyTranslation = {
      ...translatedMessages,
      [emptySelectionMessageId]: "empty"
    };

    const wrapper = mount(
      h(IntlProvider, { messages: translatedMessagesWithEmtpyTranslation, locale: Locale.en }, [
        h(LaunchpadSelect, { selectOptions, value: undefined, onChange: jest.fn(), name: "test" , translatable:true })
      ])
    );

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.contains(h("option", { value: "" , disabled: true}, [ "empty" ]))).toBeTruthy();

  });

});
