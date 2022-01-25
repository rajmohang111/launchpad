import { DeviceStore } from "./components/DeviceStoreProvider";

export type LocalStorage = {
  getItem: (key: string) => any;
  setItem: (key: string, value: any) => void
};
export const createLocalStore = (localStorage: LocalStorage): DeviceStore => {

  const get = <Value>(key: string): Promise<Value> => {
    try {
      return Promise.resolve(JSON.parse(localStorage.getItem(key)));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  const put = <Value>(key: string, value: Value): Promise<void> => {
    try {
      return Promise.resolve(localStorage.setItem(key, JSON.stringify(value)));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return {
    put,
    get
  };

};
