import { RestProvider } from "../RestProvider";
import * as h from "react-hyperscript";
import { mount } from "enzyme";
import { createInitRootState, RootState } from "../../../../main/reducers/main";
import { Provider } from "react-redux";
import configureStore, { MockStore } from "redux-mock-store";
import { PassedRestProps, Rest } from "../Rest";
import * as fetchMock from "jest-fetch-mock";
import { createAccountFixture } from "../../../models/__fixture__/settings";

describe("Rest Consumer", () => {

  const RestEnabledComponent = (restContext: PassedRestProps) => h("div", [`${String(restContext.restServices !== undefined)}:${String(restContext.credential !== undefined)}`]);
  const initState = createInitRootState();

  const mockStore = configureStore<RootState>([]);
  let store: MockStore<RootState>;

  beforeEach(() => {
    store = mockStore(initState);
  });

  it("passes initial rest context", () => {
    const wrapper = mount(h(Provider, { store }, [
      h(RestProvider, { fetch: { fetch: fetchMock } }, [
        h(Rest, { component: RestEnabledComponent })
      ])
    ]));

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.contains(h("div", "true:true"))).toEqual(true);
  });

  it("initiales rest context when account information is available but rest is not set up", () => {

    const stateWithAccount: RootState = {
      ...initState,
      modules: {
        ...initState.modules,
        settings: {
          ...initState.modules.settings,
          account: {
            ...initState.modules.settings.account,
            account: createAccountFixture()
          }
        }
      }
    };
    store = mockStore(stateWithAccount);
    const RestComponentWithRestContextSetup = (restContext: PassedRestProps) => h("div", [`${String(restContext.restServices !== undefined)}:${String(restContext.credential !== undefined)}`]);

    const wrapper = mount(h(Provider, { store }, [
      h(RestProvider, { fetch: { fetch: fetchMock } }, [
        h(Rest, { component: RestComponentWithRestContextSetup })
      ])
    ]));

    expect(wrapper).not.toBeUndefined();
    expect(wrapper.contains(h("div", "true:true"))).toEqual(true);
  });

});
