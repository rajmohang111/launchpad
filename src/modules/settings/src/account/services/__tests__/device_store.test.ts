import { createSettingTestStore, TestSettingStore } from "../../../_common/__test_data__/device_store";
import { AccountDeviceStore, createAccountDeviceStore, createAccountInit } from "../device_store";
import { SettingsPropertyKey } from "../../../_common/device_store";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import { expectLaunchPadError } from "../../../../../../__test_util__/error";
import { createDeviceStoreAccountFixture } from "../__fixtures__/device_store";
import { Account } from "../../../../../../_common/models/settings";

describe("Settings Account Device Store", () => {

  const account: Account = createDeviceStoreAccountFixture();
  let settingsStore: TestSettingStore;
  let accountStore: AccountDeviceStore;

  beforeEach(() => {
    settingsStore = createSettingTestStore();
    accountStore = createAccountDeviceStore(settingsStore);
  });

  describe("saveAccount", () => {

    it("saves account", async () => {

      await accountStore.saveAccount(account);

      expect(settingsStore.saveSettingsProperty).toHaveBeenCalledWith(SettingsPropertyKey.account, account);

    });

    it("throws exception in case setting store throws", async () => {

      const settingsStoreError = new LaunchPadError("Settings Store", ErrorType.settingsDeviceStore);
      settingsStore.saveSettingsProperty.mockRejectedValue(settingsStoreError);

      try {
        await accountStore.saveAccount(account);
        fail("Should throw");
      } catch (e) {
        expectLaunchPadError(e, ErrorType.accountDeviceStore);
      }

    });

  });

  describe("clear", () => {

    it("sets account state to init", async () => {

      const accountExpected: Account = createAccountInit();

      await accountStore.clear();

      expect(settingsStore.saveSettingsProperty).toHaveBeenCalledWith(SettingsPropertyKey.account, accountExpected);

    });

    it("throws exception in case setting store throws", async () => {

      const settingsStoreError = new LaunchPadError("Settings Store", ErrorType.settingsDeviceStore);
      settingsStore.saveSettingsProperty.mockRejectedValue(settingsStoreError);

      try {
        await accountStore.clear();
        fail("Should throw");
      } catch (e) {
        expectLaunchPadError(e, ErrorType.accountDeviceStore);
      }

    });

  });

});
