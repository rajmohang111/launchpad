import configureStore from "redux-mock-store";
import * as h from "react-hyperscript";
import { mount } from "enzyme";
import App from "../App";
import { Provider } from "react-redux";
import { createInitRootState } from "../../../main/reducers/main";
import thunk from "redux-thunk";

describe("App Container", () => {

  const mockStore = configureStore([thunk]);
  const store = mockStore(createInitRootState());

  describe("init", () => {

    it("renders", async () => {

      const TestComponent = h(Provider, { store }, [
        h(App)
      ]);

      const wrapper = mount(TestComponent);
      expect(wrapper).not.toBeUndefined();

    });

  });


});
