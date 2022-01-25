import { Account } from "../models/settings";

export type SharedAccountDeviceStore = {
  saveAccount: (account: Account) => Promise<void>;
  clear: () => Promise<void>;
};
