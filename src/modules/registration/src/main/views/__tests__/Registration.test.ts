import { createNewAccountFromRegistrationView, initRegistrationView, RegistrationView } from "../Registration";
import { NewAccount, Salutation } from "../../../../../../_common/models/settings";
import { Region } from "../../../../../../_common/models/system";
import { phoneFormatter } from "../../../../../../_common/services/formatter";

describe("Registration View", () => {

  describe("initRegistrationView", () => {

    it("inits", () => {
      const initExpected: RegistrationView = {
        customerNo: "",
        salutation: undefined,
        firstName: "",
        lastName: "",
        email: "",
        mobile: undefined,
        region: undefined,
        isAcknowledge: false
      };

      expect(initRegistrationView()).toEqual(initExpected);


    });

  });

  describe("createNewAccountFromRegistrationView", () => {

    const registrationView: RegistrationView = {
      customerNo: "123456",
      salutation: Salutation.MR,
      firstName: "testFirst",
      lastName: "testLast",
      email: "testfirst.testlast@km.de",
      region: Region.CHINA,
      isAcknowledge: true
    };
    const newAccountExpected: NewAccount = {
      person: {
        firstName: registrationView.firstName,
        lastName: registrationView.lastName,
        salutation: registrationView.salutation as Salutation,
        customerNumber: registrationView.customerNo
      },
      contact: {
        eMail: registrationView.email,
        mobileNumber: registrationView.mobile
      },
      credential: {
        region: registrationView.region as Region,
        username: registrationView.email,
      },
      metadata: {
        isEmailVerified: false,
        isActive: false,
      }
    };
    it("creates new account from registration view", () => {

      const newAccountReturned = createNewAccountFromRegistrationView(registrationView);

      expect(newAccountReturned).toEqual(newAccountExpected);

    });

    it("makes username and email address lowercase", () => {

      const registrationViewMixedCase: RegistrationView = {
        customerNo: "123456",
        salutation: Salutation.MR,
        firstName: "testFirst",
        lastName: "testLast",
        email: "testFirst.testLast@km.de",
        region: Region.CHINA,
        isAcknowledge: true
      };

      const newAccountExpectedUsernameAndEmail: NewAccount = {
        ...newAccountExpected,
        contact: {
          ...newAccountExpected.contact,
          eMail: registrationView.email.toLowerCase(),
        },
        credential: {
          ...newAccountExpected.credential,
          username: registrationView.email.toLowerCase(),
        }
      };

      const newAccountReturned = createNewAccountFromRegistrationView(registrationViewMixedCase);

      expect(newAccountReturned).toEqual(newAccountExpectedUsernameAndEmail);

    });

    it("sets salutation and region to default in case not set", () => {

      const registrationViewNotAllSet: RegistrationView = {
        ...registrationView,
        salutation: undefined,
        region: undefined
      };

      const newAccountExpectedSalutationAndRegion: NewAccount = {
        ...newAccountExpected,
        person: {
          ...newAccountExpected.person,
          salutation: Salutation.MR,
        },
        credential: {
          ...newAccountExpected.credential,
          region: Region.OTHER,
        }
      };

      const newAccountReturned = createNewAccountFromRegistrationView(registrationViewNotAllSet);

      expect(newAccountReturned).toEqual(newAccountExpectedSalutationAndRegion);

    });

    it("formats mobile phone number in case set", () => {

      const registrationViewNotAllSet: RegistrationView = {
        ...registrationView,
        mobile: "+49 9 876-543 210"
      };

      const newAccountExpectedSalutationAndRegion: NewAccount = {
        ...newAccountExpected,
        contact: {
          ...newAccountExpected.contact,
          mobileNumber: phoneFormatter(registrationViewNotAllSet.mobile as string)
        }

      };

      const newAccountReturned = createNewAccountFromRegistrationView(registrationViewNotAllSet);

      expect(newAccountReturned).toEqual(newAccountExpectedSalutationAndRegion);

    });

  });

});
