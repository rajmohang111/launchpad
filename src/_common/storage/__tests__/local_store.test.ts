import { createLocalStore, LocalStorage } from "../local_store";

describe("Local DeviceStore", () => {

  const localStorage: LocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn()
  };

  const localStore = createLocalStore(localStorage);

  const testKey = "key";
  const testValue = "test";

  describe("getItem", () => {

    it("returns item", async () => {

      (localStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(testValue));

      const valueReturned = await localStore.get(testKey);

      expect(valueReturned).toEqual(testValue);

    });

    it("returns null in case local store returns null", async () => {

      (localStorage.getItem as jest.Mock).mockReturnValue(null);

      const valueReturned = await localStore.get(testKey);

      expect(valueReturned).toEqual(null);

    });

    it("returns error in case locale store throws", async () => {

      const testError = new Error("testError");
      (localStorage.getItem as jest.Mock).mockImplementation(() => {
        throw testError;
      });

      try {
        await localStore.get(testKey);
        fail("Should throw");
      } catch (e) {
        expect(e).toEqual(testError);
      }

    });

  });

  describe("setItem", () => {

    it("sets Item", async () => {

      await localStore.put(testKey, testValue);

      expect(localStorage.setItem).toHaveBeenCalledWith(testKey, JSON.stringify(testValue));
    });

    it("returns error in case locale store throws", async () => {

      const testError = new Error("testError");
      (localStorage.setItem as jest.Mock).mockImplementation(() => {
        throw testError;
      });

      try {
        await localStore.put(testKey, testValue);
        fail("Should throw");
      } catch (e) {
        expect(e).toEqual(testError);
      }

    });

  });

});
