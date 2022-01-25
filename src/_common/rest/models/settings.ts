import { Account, NewAccount } from "../../models/settings";
import { Credential } from "./rest";

export type SharedAccountRestService = {
  loadAccountFromHost: (credential: Credential, host: string) => Promise<Account>
  loadAccount: (credential: Credential) => Promise<Account>,
  createAccount: (credential: Credential, newAccount: NewAccount, specifiedHost: string) => Promise<void>
  resetPassword: (email: string, specifiedHost: string, credential: Credential) => Promise<void>;
};
