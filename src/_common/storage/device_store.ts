import { fromNullable } from "fp-ts/lib/Option";
import { DeviceStore } from "./components/DeviceStoreProvider";
import { SettingsDeviceStores } from "../../modules/settings/src/_common/device_stores";

export type DeviceStores = {
  store: DeviceStore,
  settingsDeviceStores: SettingsDeviceStores,
};

export const propertyObjectLoader = <Container extends object, Property>(key: string, container: Container | null): Property | null =>
  fromNullable(container)
    .chain(container => fromNullable(container[key]))
    .toNullable();

export const propertyObjectUpdater = <Container extends object, Property>(key: string, oldContainer: Container | null, updatedProperty: Property, initContainer: Container): Container =>
  fromNullable(oldContainer)
    .map(() => ({
      ...oldContainer as object,
      [key]: updatedProperty
    } as Container))
    .getOrElse({
      ...initContainer as object,
      [key]: updatedProperty
    } as Container);

