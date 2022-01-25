import { mount } from "enzyme";
import IntlProvider, { Locale } from "../../i18n/IntlProvider";
import PendingButton from "../PendingButton";
import * as h from "react-hyperscript";
import { ProgressCircular } from "react-onsenui";

describe("Pending Button", () => {


  const ProgessElement = h(ProgressCircular, {  indeterminate: true });
  it("displays as pending when request is pending", () => {

    const wrapper = mount(h(IntlProvider, { messages: {}, locale: Locale.en }, [
      h(PendingButton, { messageId: "test", requestPending: true })
    ]));

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.contains(ProgessElement)).toBeTruthy();

  });

  it("Displays message in case request is not pending", () => {

    const wrapper = mount(h(IntlProvider, { messages: {}, locale: Locale.en }, [
      h(PendingButton, { messageId: "test", requestPending: false })
    ]));

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.contains(ProgessElement)).toBeFalsy();

  });

});
