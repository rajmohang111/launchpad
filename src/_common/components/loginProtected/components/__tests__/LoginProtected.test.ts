import { mount } from "enzyme";
import { createInitRootState, RootState } from "../../../../../main/reducers/main";
import * as h from "react-hyperscript";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import IntlProvider, { Locale } from "../../../../i18n/IntlProvider";
import LoginProtected from "../LoginProtected";
import { AppModule } from "../../../../models/module";
import {Region} from "../../../../models/system";

describe("Login Protected Component", () => {

  const mockStore = configureStore();
  const state: RootState = createInitRootState();
  const TestComponent = () => h("div", "rendered");
  it("renders component in case user is logged in", () => {

    const stateWithCredentials: RootState = {
      ...state,
      modules: {
        ...state.modules,
        settings: {
          ...state.modules.settings,
          account: {
            ...state.modules.settings.account,
            account: {
              ...state.modules.settings.account.account,
              credential: {
                region: Region.OTHER,
                username: "testUsername",
                password: "testPassword"
              }
            }
          }
        }
      }
    };

    const store = mockStore(stateWithCredentials);

    const wrapper = mount(
      h(Provider, { store }, [
        h(IntlProvider, { messages: {}, locale: Locale.en }, [
          h(LoginProtected, { appModule: AppModule.productivity, component: TestComponent })
        ])
      ])
    );

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.contains(h(TestComponent))).toBeTruthy();

  });

  it("redirects to login in case user is not logged in", () => {

    const store = mockStore(state);

    const wrapper = mount(
      h(Provider, { store }, [
        h(IntlProvider, { messages: {}, locale: Locale.en }, [
          h(LoginProtected, { appModule: AppModule.productivity, component: TestComponent })
        ])
      ])
    );

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.contains(h(TestComponent))).toBeFalsy();
  });


});
