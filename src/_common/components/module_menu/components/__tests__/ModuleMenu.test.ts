import * as h from "react-hyperscript";
import { mount } from "enzyme";
import ModuleMenu from "../ModuleMenu";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { createInitRootState } from "../../../../../main/reducers/main";
import IntlProvider, { Locale } from "../../../../i18n/IntlProvider";

describe("Module Menu", () => {

  const store = configureStore()(createInitRootState());

  const TestComponent = () => h("div", "test");
  it("renders component and footer", () => {

    const wrapper = mount(h(Provider, { store }, [
      h(IntlProvider, { messages: {}, locale: Locale.en }, [
        h(ModuleMenu, { component: () =>
            h(TestComponent)
        })
      ])
    ]));

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.find(TestComponent)).toBeTruthy();
    expect(wrapper.find("footer").exists()).toBeTruthy();

  });

});
