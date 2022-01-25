import { Account, Salutation } from "../../../../../../_common/models/settings";
import { createAccountFixture } from "../../../../../../_common/models/__fixture__/settings";
import { createAccountUpdate, createUserDetailsViewState, UserDetailsViewState } from "../UserDetails";
import { AccountUpdate } from "../../models/account";

describe("User Details View", () => {

  const account: Account = createAccountFixture();
  const viewState: UserDetailsViewState = {
    firstName: account.person.firstName,
    lastName: account.person.lastName,
    salutation: account.person.salutation,
    mobileNumber: account.contact.mobileNumber,
    customerNumber: account.person.customerNumber,
    userName: account.credential.username,
    email: account.contact.eMail
  };
  const accountUpdate: AccountUpdate = {
    person: {
      firstName: viewState.firstName,
      lastName: viewState.lastName,
      salutation: viewState.salutation as Salutation
    },
    contact: {
      mobileNumber: viewState.mobileNumber
    },
    credential: {}
  };
  describe("createUserDetailsViewState", () => {


    it("creates view state", () => {
      const viewStateReturned = createUserDetailsViewState(account.contact, account.person, account.credential);

      expect(viewStateReturned).toEqual(viewState);

    });
  });

  describe("createAccountUpdate", () => {


    it("creates", () => {
      const accountUpdateReturned = createAccountUpdate(viewState);

      expect(accountUpdateReturned).toEqual(accountUpdate);

    });

    it("formats phone number", () => {
      const viewStateWithMalformedPhoneNumber: UserDetailsViewState = {
        ...viewState,
        mobileNumber: "+48 1234 56789"
      };
      const accountUpdateExpected: AccountUpdate = {
        ...accountUpdate,
        contact: {
          ...accountUpdate.contact,
          mobileNumber: viewState.mobileNumber
        }
      };

      const accountUpdateReturned = createAccountUpdate(viewStateWithMalformedPhoneNumber);

      expect(accountUpdateReturned).toEqual(accountUpdateExpected);

    });

  });
  
});
