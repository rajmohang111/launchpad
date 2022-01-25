import { CollapsedMenuProps } from "../CollapsedMenu";
import { AppModule } from "../../../../models/module";
import * as h from "react-hyperscript";
import CollapsedMenu from "../CollapsedMenu";
import { mount } from "enzyme";

describe("Module Menu Collapsed", () => {

  const props: CollapsedMenuProps = {
    selectedModule: AppModule.settings,
    actions: {
      onMenuOpen: jest.fn(),
      onHomeSelect: jest.fn(),
      onModuleSelect: jest.fn()
    }
  };
  it("renders", () => {

    const wrapper = mount(h(CollapsedMenu, props));

    expect(wrapper).not.toBeUndefined();


  });

});
