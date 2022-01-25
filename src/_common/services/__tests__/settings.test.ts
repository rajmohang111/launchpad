import {
  createSharedAccountDeviceStoreFixture,
  SharedAccountDeviceStoreFixture
} from "../../stores/__fixtures__/settings";
import { logout } from "../settings";

describe("Settings Service", () => {

  describe("logout", () => {

    const deviceStore: SharedAccountDeviceStoreFixture  = createSharedAccountDeviceStoreFixture();

    beforeEach(() => {
      deviceStore.clear.mockClear();
    });

    it("clears device store", async () => {

      await logout(deviceStore);

      expect(deviceStore.clear).toHaveBeenCalled();

    });

  });

});
