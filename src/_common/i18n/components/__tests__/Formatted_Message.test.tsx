import * as React from "react";
import { Messages } from "../../format_message";
import IntlProvider, { Locale } from "../../IntlProvider";
import { mount } from "enzyme";
import FormattedMessage, { FormattedMessageProps } from "../Formatted_Message";

describe("Formatted Message", () => {

  const messages: Messages = {
    message: "test message",
  };

  const onClickFunction = jest.fn();

  const componentWithIntl = (Component: React.ComponentType<FormattedMessageProps>, props: FormattedMessageProps, locale = Locale.en) => (
    <IntlProvider messages={messages} locale={locale}>
      <Component {...props} />
    </IntlProvider>
  );

  it("formats message", () => {

    const wrapper = mount(componentWithIntl(FormattedMessage, { id: "message" }));
    expect(wrapper.contains(<span>{messages.message}</span>)).toEqual(true);
  });

  it("test click event", () => {

    const wrapper = mount(componentWithIntl(FormattedMessage, { id: "message", onClick: () => onClickFunction() }));
    wrapper.find("span").last().simulate("click");
    expect(onClickFunction).toHaveBeenCalled();
  });

  it("returns span with default message in case messageId cannot be found", () => {

    const notExistingMessageId = "doesNotExist";
    const defaultMessage = "Does Not Exist";

    const wrapper = mount(componentWithIntl(FormattedMessage, { id: notExistingMessageId, defaultMessage }));
    expect(wrapper.contains(<span>{defaultMessage}</span>)).toEqual(true);
  });

});
