import LaunchpadToastView, { LaunchpadToastViewProps } from "../LaunchpadToast";
import { createLaunchpadToastInitState } from "../../reducers/launchpad_toast";
import { mount } from "enzyme";
import * as h from "react-hyperscript";
import IntlProvider, { Locale } from "../../../../i18n/IntlProvider";
import { Toast } from "react-onsenui";

describe("LaunchpadToast", () => {

  const onHideLaunchpadToast = jest.fn();
  const launchpadToastProps: LaunchpadToastViewProps = {
    launchpadToastState: {
      ...createLaunchpadToastInitState(),
      metadata: {
        isOpen: true
      }
    },
    actions: {
      onHideLaunchpadToast
    }
  };
  it("renders in case toast is open", () => {

    const wrapper = mount(h(IntlProvider, { messages: {}, locale: Locale.en }, [
      h(LaunchpadToastView, launchpadToastProps)
    ]));

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.find(Toast).exists()).toBeTruthy();
  });

  it("closes launchpad toast when dismiss is clicked", () => {

    const wrapper = mount(h(IntlProvider, { messages: {}, locale: Locale.en }, [
      h(LaunchpadToastView, launchpadToastProps)
    ]));

    expect(wrapper).not.toBeUndefined();
    wrapper.find(".toast__button").simulate("click");
    expect(onHideLaunchpadToast).toHaveBeenCalled();

  });

  it("does not render in case toast is closed", () => {

    const closedLaunchpadToastProps: LaunchpadToastViewProps = {
      ...launchpadToastProps,
      launchpadToastState: {
        ...launchpadToastProps.launchpadToastState,
        metadata: {
          isOpen: false
        }
      }
    };

    const wrapper = mount(h(IntlProvider, { messages: {}, locale: Locale.en }, [
      h(LaunchpadToastView, closedLaunchpadToastProps)
    ]));

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.find(Toast).exists()).toBeFalsy();

  });

});
