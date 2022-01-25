import { DeviceStoreContext, DeviceStoreProvider } from "../DeviceStoreProvider";
import * as h from "react-hyperscript";
import { mount } from "enzyme";
import { DeviceStore } from "../DeviceStore";
import { createTestDeviceStore, TestDeviceStore } from "../../__test_data__/test_device_store";

describe("Device DeviceStore", () => {

  const testStore: TestDeviceStore = createTestDeviceStore();

  const testComponentCreator = (storeKey: string) => (storeContext: DeviceStoreContext) => h("div", storeContext.deviceStores.store.get(storeKey));

  it("passes device store to children", () => {

    const storeKey = "test";
    const TestComponent = testComponentCreator(storeKey);

    const returnValue = "loaded";
    testStore.get.mockReturnValue(returnValue);

    const wrapper = mount(h(DeviceStoreProvider, { store: testStore }, [
      h(DeviceStore, { component: TestComponent })
    ]));

    expect(wrapper).not.toEqual(undefined);
    expect(wrapper.contains(h("div", returnValue))).toEqual(true);

  });

});
