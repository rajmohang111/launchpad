import {
  createSharedAccountDeviceStoreFixture,
  SharedAccountDeviceStoreFixture
} from "../../../../../../_common/stores/__fixtures__/settings";
import { Account } from "../../../../../../_common/models/settings";
import {Region} from "../../../../../../_common/models/system";
import { createAccountFixture } from "../../../../../../_common/models/__fixture__/settings";

export type TestAccountDeviceStores = {
  accountDeviceStore: AccountDeviceStoreFixture;
};

export const createTestAccountDeviceStores = (): TestAccountDeviceStores => ({
  accountDeviceStore: createAccountDeviceStoreFixture()
});

export type AccountDeviceStoreFixture = SharedAccountDeviceStoreFixture;

export const createAccountDeviceStoreFixture = (): AccountDeviceStoreFixture => createSharedAccountDeviceStoreFixture();

export const createDeviceStoreAccountFixture = (): Account => ({
  ...createAccountFixture(),
  credential: {
    region: Region.OTHER,
    username: "testUser",
    password: "testPassword"
  }
});
