import { Account } from "../../models/settings";

export type SharedAccountDeviceStoreFixture = {
  saveAccount: jest.Mock<(account: Account) => Promise<void>>
  clear: jest.Mock;
};

export const createSharedAccountDeviceStoreFixture = (): SharedAccountDeviceStoreFixture => ({
  saveAccount: jest.fn(),
  clear: jest.fn()
});
