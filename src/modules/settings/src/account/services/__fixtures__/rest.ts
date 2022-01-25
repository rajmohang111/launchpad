import { AccountLoadResponse } from "../rest";
import {
  createSharedAccountRestServiceFixture,
  SharedAccountRestServiceFixture
} from "../../../../../../_common/rest/models/__fixture__/settings";

export type AccountRestServiceFixture = SharedAccountRestServiceFixture & {
  updateAccount: jest.Mock;
};
export const createAccountRestServiceFixture = (): AccountRestServiceFixture => ({
  ...createSharedAccountRestServiceFixture(),
  updateAccount: jest.fn()
});

export const createAccountResponseFixture = (): AccountLoadResponse => ({
  data: {
    type: "devices",
    id: "testUserId",
    attributes: {
      person: {
        salutation: "salutation_mr",
        firstName: "fe",
        lastName: "User",
        username: "feUser@logicline.de",
        customerNumber: "123456"
      },
      contact: {
        eMail: "feUser@logicline.de",
        mobilePhone: "+48 123 456 789"
      },
      metadata: {
        isEmailVerified: true,
        isActive: true,
      }
    },
    links: {
      self: "https://karlmayer.adamos-dev.com/users/testUserId"
    }
  }
});
