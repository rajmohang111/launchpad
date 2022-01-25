import { createTestDeviceStore, TestDeviceStore } from "../../__test_data__/test_device_store";
import { DeviceStoreProvider } from "../../components/DeviceStoreProvider";
import * as h from "react-hyperscript";
import { mount } from "enzyme";
import { InjectedDeviceStoreProps, withDeviceStore } from "../device_store";

describe("DeviceStore Hoc", () => {

  const testStore: TestDeviceStore = createTestDeviceStore();

  const testComponentCreator = (storeKey: string) => withDeviceStore(({ storeContext }: InjectedDeviceStoreProps) => h("div", storeContext.deviceStores.store.get(storeKey)));

  it("passes store context", () => {

    const storeKey = "test";
    const TestComponent = testComponentCreator(storeKey);

    const returnValue = "loaded";
    testStore.get.mockReturnValue(returnValue);

    const wrapper = mount(h(DeviceStoreProvider, { store: testStore }, [
      h(TestComponent)
    ]));

    expect(wrapper).not.toEqual(undefined);
    expect(wrapper.contains(h("div", returnValue))).toEqual(true);

  });


});
