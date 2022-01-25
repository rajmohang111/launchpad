import { OpenMenuProps } from "../OpenMenu";
import { AppModule } from "../../../../../models/module";
import { mount } from "enzyme";
import * as h from "react-hyperscript";
import OpenMenu from "../OpenMenu";
import IntlProvider, { Locale } from "../../../../../i18n/IntlProvider";

describe("Module Menu Open", () => {

  const props: OpenMenuProps = {
    isLoggedIn: true,
    isOpen: true,
    selectedModule: AppModule.settings,
    actions: {
      closeMenu: jest.fn(),
      onHomeSelect: jest.fn(),
      onModuleSelect: jest.fn()
    }
  };
  it("renders", () => {

    const wrapper = mount(h(IntlProvider, { messages: {}, locale: Locale.en }, [
      h(OpenMenu, props)
    ]));

    expect(wrapper).not.toBeUndefined();

  });

});
