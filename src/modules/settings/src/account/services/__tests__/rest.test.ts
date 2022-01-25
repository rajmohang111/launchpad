import {
    accountContentType,
    AccountCreateRequest,
    AccountLoadResponse,
    AccountUpdateRequest,
    createAccountRestService,
    mePath, ResetEmailRequest, resetPasswordContentType, resetPasswordPath,
    usersPath,
} from "../rest";
import { createAccountResponseFixture } from "../__fixtures__/rest";
import { Account, NewAccount, salutationFromString } from "../../../../../../_common/models/settings";
import * as fetchMock from "jest-fetch-mock";
import { createBasicAuthHeader } from "../../../../../../_common/rest/services/rest";
import { expectCalloutError } from "../../../../../../__test_util__/error";
import { CalloutErrorType, ErrorType } from "../../../../../../_common/error/error";
import { adamosHost, adamosHostDEV, Credential, technicalUser } from "../../../../../../_common/rest/models/rest";
import { Region } from "../../../../../../_common/models/system";
import { determineHost } from "../../../../../../_common/selectors/settings";
import { createAccountFixture, createNewAccountFixture } from "../../../../../../_common/models/__fixture__/settings";

describe("Account Rest Service", () => {

    beforeEach(() => {
        fetchMock.mockClear();
    });

    const host = adamosHost;
    const accountRestService = createAccountRestService({ fetch: fetchMock }, host);
    const credential: Credential = {
        region: Region.OTHER,
        username: "testUsername",
        password: "testPassword"
    };

    const createAccountRequestFromNewAccount = (credential: Credential, newAccount: NewAccount): AccountCreateRequest => ({
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

    const createAccountRequestFromAccount = (credential: Credential, account: Account): AccountUpdateRequest => ({
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

    describe("loadAccountFromHost", () => {

        const accountResponse: AccountLoadResponse = createAccountResponseFixture();
        accountResponse.data.attributes.person.username = credential.username;

        it("loads account information for user", async () => {
            fetchMock.mockResponse(JSON.stringify(accountResponse));

            const accountExpected: Account = {
                person: {
                    customerNumber: accountResponse.data.attributes.person.customerNumber,
                    salutation: salutationFromString(accountResponse.data.attributes.person.salutation),
                    firstName: accountResponse.data.attributes.person.firstName,
                    lastName: accountResponse.data.attributes.person.lastName
                },
                contact: {
                    eMail: accountResponse.data.attributes.contact.eMail,
                    mobileNumber: accountResponse.data.attributes.contact.mobilePhone,
                },
                credential: {
                    region: credential.region,
                    username: credential.username,
                    password: credential.password
                },
                metadata: {
                    isEmailVerified: accountResponse.data.attributes.metadata.isEmailVerified,
                    isActive: accountResponse.data.attributes.metadata.isActive
                }
            };
            const mePathExpected = mePath(host);

            const accountReturned = await accountRestService.loadAccountFromHost(credential, host);

            expect(accountReturned).toEqual(accountExpected);
            const requestExpected = {
                headers: {
                    ...createBasicAuthHeader(credential.username, credential.password),
                    // ...createAuthHeader(credential.username, credential.password),
                    Accept: accountContentType
                },
                method: "GET"
            };
            expect(fetchMock).toHaveBeenCalledWith(mePathExpected, requestExpected);
        });

        it("returns error in case callout throws", async () => {
            const error = new Error("Callout Error");
            fetchMock.mockRejectedValue(error);

            try {
                await accountRestService.loadAccountFromHost(credential, host);
                fail("Should throw");
            } catch (e) {
                expectCalloutError(e, ErrorType.accountRestService, CalloutErrorType.error);
            }

        });

        it("returns error in case response does not contain an valid account", async () => {
            fetchMock.mockResponse("");

            try {
                await accountRestService.loadAccountFromHost(credential, host);
                fail("Should throw");
            } catch (e) {
                expectCalloutError(e, ErrorType.accountRestService, CalloutErrorType.error);
            }
        });

    });

    describe("loadAccount", () => {

        const accountResponse: AccountLoadResponse = createAccountResponseFixture();

        beforeEach(() => {
            fetchMock.mockResponse(JSON.stringify(accountResponse));
        });

        it("loads account", async () => {

            const mePathExpected = mePath(host);

            const accountReturned = await accountRestService.loadAccount(credential);

            expect(accountReturned).not.toBeUndefined();
            expect(fetchMock).toHaveBeenCalledWith(mePathExpected, expect.any(Object));

        });

    });

    describe("create Account", () => {


        const testAccount: NewAccount = createNewAccountFixture();

        it("creates account", async () => {

            fetchMock.mockResponse("", { status: 201 });

            const accountRequestExpected: AccountCreateRequest = createAccountRequestFromNewAccount(credential, testAccount);

            await accountRestService.createAccount(credential, testAccount, determineHost(credential.region));

            const requestExpected = {
                headers: {
                    ...createBasicAuthHeader(credential.username, credential.password),
                    "Content-Type": accountContentType
                },
                method: "POST",
                body: JSON.stringify(accountRequestExpected)
            };
            expect(fetchMock).toHaveBeenCalledWith(usersPath(host), requestExpected);

        });

        it("returns error in case callout throws", async () => {
            const error = new Error("Callout Error");
            fetchMock.mockRejectedValue(error);

            try {
                await accountRestService.createAccount(credential, testAccount, determineHost(credential.region));
                fail("Should throw");
            } catch (e) {
                expectCalloutError(e, ErrorType.accountRestService, CalloutErrorType.error);
            }

        });

    });

    describe("update Account", () => {

        const updatedAccount = createAccountFixture();

        it("updates account", async () => {

            fetchMock.mockResponse("", { status: 201 });

            const accountRequestExpected: AccountUpdateRequest = createAccountRequestFromAccount(credential, updatedAccount);

            await accountRestService.updateAccount(credential, updatedAccount);

            const requestExpected = {
                headers: {
                    ...createBasicAuthHeader(credential.username, credential.password),
                    "Content-Type": accountContentType
                },
                method: "PUT",
                body: JSON.stringify(accountRequestExpected)
            };
            const pathExpected = `${usersPath(host)}/${credential.username}`;

            expect(fetchMock).toHaveBeenCalledWith(pathExpected, requestExpected);

        });

        it("returns error in case callout throws", async () => {
            const error = new Error("Callout Error");
            fetchMock.mockRejectedValue(error);

            try {
                await accountRestService.updateAccount(credential, updatedAccount);
                fail("Should throw");
            } catch (e) {
                expectCalloutError(e, ErrorType.accountRestService, CalloutErrorType.error);
            }

        });

        describe("resetPassword", () => {


            const specifiedHost = adamosHostDEV;
            beforeEach(() => {
                fetchMock.mockResponse("", { status: 200 });
            });

            it("resets password", async () => {

                const eMail = "test@test.de";
                const resetEmailBodyExpected: ResetEmailRequest = {
                    email: eMail
                };
                const requestExpected: RequestInit = {
                    headers: {
                        ...createBasicAuthHeader(technicalUser.username, technicalUser.password),
                        "Content-Type": resetPasswordContentType
                    },
                    method: "POST",
                    body: JSON.stringify(resetEmailBodyExpected)
                };

                await accountRestService.resetPassword(eMail, specifiedHost, technicalUser);

                expect(fetchMock).toHaveBeenCalledWith(resetPasswordPath(specifiedHost), requestExpected);

            });

            it("returns error in case callout throws", async () => {
                const error = new Error("Callout Error");
                fetchMock.mockRejectedValue(error);

                const mail = "test@test.de";
                try {
                    await accountRestService.resetPassword(mail, specifiedHost, technicalUser);
                    fail("Should throw");
                } catch (e) {
                    expectCalloutError(e, ErrorType.accountRestService, CalloutErrorType.error);
                }

            });

        });

    });

});
