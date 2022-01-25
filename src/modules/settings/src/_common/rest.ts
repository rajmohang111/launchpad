import { AccountRestService, createAccountRestService } from "../account/services/rest";

export type SettingsRestServices = {
  accountRestService: AccountRestService
};
export const createSettingsRestServices = (fetch: GlobalFetch, host: string): SettingsRestServices => ({
  accountRestService: createAccountRestService(fetch, host)
});
