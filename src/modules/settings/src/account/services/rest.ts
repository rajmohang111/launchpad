import { SharedAccountRestService } from "../../../../../_common/rest/models/settings";
import { Account, NewAccount, salutationFromString } from "../../../../../_common/models/settings";
import { createBasicAuthHeader, checkOrThrowCalloutError } from "../../../../../_common/rest/services/rest";
import { CalloutError, CalloutErrorType, ErrorType } from "../../../../../_common/error/error";
import { AccountUpdate } from "../models/account";
import { Credential, Data, launchpadUrl, SelfLink } from "../../../../../_common/rest/models/rest";

export const usersPath = (host: string) => `${launchpadUrl(host)}/users`;
export const mePath = (host: string) => `${usersPath(host)}/me`;
export const resetPasswordPath = (host: string) => `${usersPath(host)}/passwordReset`;
export const accountContentType = "application/vnd.karlmayer.launchpad.v1.user+json";
export const resetPasswordContentType = "application/json";
export const usernameQueryParam = "username";

export type AccountRestService = SharedAccountRestService & {
  updateAccount: (credential: Credential, account: AccountUpdate) => Promise<void>
};

type Person = {
  salutation: string,
  firstName: string,
  lastName: string,
  username: string,
  customerNumber: string,
};

type Contact = {
  eMail: string,
  mobilePhone?: string
};

type Metadata = {
  isEmailVerified: boolean,
  isActive: boolean,
};

export type AccountLoadResponse = {
  data: Data & {
    attributes: {
      person: Person,
      contact: Contact,
      metadata: Metadata
    },
    links?: SelfLink
  }
};

export type AccountCreateRequest = {
  data: Data & {
    attributes: {
      person: Person & {
        password: string
      },
      contact: Contact
    },
    links?: SelfLink
  }
};

export type AccountUpdateRequest = {
  data: Data & {
    attributes: {
      person: Partial<Person>,
      contact: Partial<Contact>
    }
  },
  links?: SelfLink
};

export type ResetEmailRequest = {
  email: string
};

const checkOrThrow = checkOrThrowCalloutError(ErrorType.accountRestService);

const transformAccountLoadResponse = async (credential: Credential, body: string): Promise<Account> => {

  const accountBody = JSON.parse(body) as AccountLoadResponse;
  return {
    person: {
      customerNumber: accountBody.data.attributes.person.customerNumber,
      salutation: salutationFromString(accountBody.data.attributes.person.salutation),
      firstName: accountBody.data.attributes.person.firstName,
      lastName: accountBody.data.attributes.person.lastName
    },
    contact: {
      eMail: accountBody.data.attributes.contact.eMail,
      mobileNumber: accountBody.data.attributes.contact.mobilePhone,
    },
    credential: {
      region: credential.region,
      username: accountBody.data.attributes.person.username,
      password: credential.password
    },
    metadata: {
      isEmailVerified: accountBody.data.attributes.metadata.isEmailVerified,
      isActive: accountBody.data.attributes.metadata.isActive,
    }
  };

};
// TODO: Remove password empty field string
const transformAccountCreate = (credential: Credential, newAccount: NewAccount | Account): AccountCreateRequest => ({
  data: {
    type: "users",
    id: credential.username,
    attributes: {
      person: {
        salutation: newAccount.person.salutation,
        firstName: newAccount.person.firstName,
        lastName: newAccount.person.lastName,
        username: newAccount.credential.username,
        customerNumber: newAccount.person.customerNumber,
        password: ""
      },
      contact: {
        eMail: newAccount.contact.eMail,
        mobilePhone: newAccount.contact.mobileNumber
      },
    }
  }
});

const transformAccountUpdate = (credential: Credential, account: AccountUpdate): AccountUpdateRequest => ({
  data: {
    type: "users",
    id: credential.username,
    attributes: {
      person: {
        salutation: account.person.salutation,
        firstName: account.person.firstName,
        lastName: account.person.lastName,
        username: account.credential.username,
        customerNumber: account.person.customerNumber,
        password: account.credential.password
      },
      contact: {
        eMail: account.contact.eMail,
        mobilePhone: account.contact.mobileNumber
      },
    }
  }
});
const createAccountRestServiceError = (error: Error) => new CalloutError(error.message, ErrorType.accountRestService, CalloutErrorType.error);
export const createAccountRestService = ({ fetch }: GlobalFetch, host: string): AccountRestService => {

  const loadAccountFromHost = async (credential: Credential, specifiedHost: string): Promise<Account> => {
    let response: Response;
    try {
      response = await fetch(mePath(specifiedHost), {
        method: "GET",
        headers: {
          ...createBasicAuthHeader(credential.username, credential.password),
          Accept: accountContentType
        }
      });
    } catch (e) {
      throw createAccountRestServiceError(e);
    }
    const body = await response.text();
    await checkOrThrow(response.status, body);
    try {
      return await transformAccountLoadResponse(credential, body);
    } catch (e) {
      throw createAccountRestServiceError(e);
    }
  };

  const loadAccount = async (credential: Credential): Promise<Account> => loadAccountFromHost(credential, host);

  const createAccount = async (credential: Credential, newAccount: NewAccount, specifiedHost: string): Promise<void> => {
    let response: Response;
    try {
      response = await fetch(usersPath(specifiedHost), {
        method: "POST",
        headers: {
          ...createBasicAuthHeader(credential.username, credential.password),
          "Content-Type": accountContentType
        },
        body: JSON.stringify(transformAccountCreate(credential, newAccount))
      });
    } catch (e) {
      throw createAccountRestServiceError(e);
    }
    await checkOrThrow(response.status, await response.text());

  };

  const updateAccount = async (credential: Credential, account: AccountUpdate): Promise<void> => {
    let response: Response;
    try {
      response = await fetch(`${usersPath(host)}/${credential.username}`, {
        method: "PUT",
        headers: {
          ...createBasicAuthHeader(credential.username, credential.password),
          "Content-Type": accountContentType
        },
        body: JSON.stringify(transformAccountUpdate(credential, account))
      });
    } catch (e) {
      throw createAccountRestServiceError(e);
    }
    await checkOrThrow(response.status, await response.text());

  };

  const resetPassword = async (email: string, specifiedHost: string, credential: Credential): Promise<void> => {
    try {
      await fetch(resetPasswordPath(specifiedHost), {
        headers: {
          ...createBasicAuthHeader(credential.username, credential.password),
          "Content-Type": resetPasswordContentType
        },
        method: "POST",
        body: JSON.stringify({
          email
        } as ResetEmailRequest)
      });
    } catch (e) {
      throw createAccountRestServiceError(e);
    }
  };

  return {
    loadAccountFromHost,
    loadAccount,
    createAccount,
    updateAccount,
    resetPassword
  };

};
