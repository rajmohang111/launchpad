import { AccountState } from "../account";
import { createContactFixture, createPersonFixture } from "../../../../../../_common/models/__fixture__/settings";
import {Region} from "../../../../../../_common/models/system";

export const createAccountStateFixture = (): AccountState => ({
  metadata: {
    requestPending: false,
  },
  account: {
    person: createPersonFixture(),
    contact: createContactFixture(),
    credential: {
      region: Region.OTHER,
      username: "testUser",
      password: "testPassword"
    },
    metadata: {
      isEmailVerified: false,
      isActive: false
    }
  }
});
