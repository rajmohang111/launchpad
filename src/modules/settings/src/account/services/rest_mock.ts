import { AccountRestService } from "./rest";
import { Account } from "../../../../../_common/models/settings";
import { Credential } from "../../../../../_common/rest/models/rest";
import { determineHost } from "../../../../../_common/selectors/settings";
import { createAccountFixture } from "../../../../../_common/models/__fixture__/settings";

const requestDelay = 2000;
export const createAccountRestServiceMock = ({ fetch }: GlobalFetch): AccountRestService => {

  const loadAccountFromHost = async (credential: Credential, host: string): Promise<Account> => createAccountFixture();
  const loadAccount = async (credential: Credential): Promise<Account> => loadAccountFromHost(credential, determineHost(credential.region));
  const updateAccount = () => new Promise<void>(resolve => setTimeout(() => resolve(), requestDelay));
  const createAccount = () => {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), requestDelay));
  };
  const resetPassword = async (email: string) => {};

  return {
    loadAccountFromHost,
    loadAccount,
    updateAccount,
    createAccount,
    resetPassword
  };
};
