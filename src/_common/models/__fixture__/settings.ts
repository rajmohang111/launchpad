import { Account, Contact, NewAccount, Person, Salutation } from "../settings";
import { Region } from "../system";

export const createPersonFixture = (): Person => ({
  firstName: "test",
  lastName: "test",
  customerNumber: "123456",
  salutation: Salutation.MR
});

export const createContactFixture = (): Contact => ({
  eMail: "test@test.de",
  mobileNumber: "123456"
});

export const createAccountFixture = (): Account => ({
  person: {
    customerNumber: "123456",
    salutation: Salutation.MR,
    firstName: "test",
    lastName: "user"
  },
  contact: {
    eMail: "testUser@logicline.de",
    mobileNumber: "+48123456789",
  },
  credential: {
    region: Region.OTHER,
    username: "feUser@logicline.de",
    password: "feUserLogicline"
  },
  metadata: {
    isEmailVerified: true,
    isActive: true,
  }
});

export const createNewAccountFixture = (): NewAccount => ({
  person: {
    customerNumber: "123456",
    salutation: Salutation.MR,
    firstName: "test",
    lastName: "user"
  },
  contact: {
    eMail: "testUser@logicline.de",
    mobileNumber: "+48123456789",
  },
  credential: {
    region: Region.OTHER,
    username: "feUser@logicline.de",
  },
  metadata: {
    isEmailVerified: true,
    isActive: true,
  }
});
