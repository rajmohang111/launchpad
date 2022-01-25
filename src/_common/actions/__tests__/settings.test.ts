import {
  AccountUpdateAction,
  accountUpdateActionType,
  createAccountUpdateAction
} from "../settings";
import { Account } from "../../models/settings";
import { createAccountFixture } from "../../models/__fixture__/settings";

describe("Common settings action creator", () => {


  describe("createAccountUpdateAction", () => {

    const account: Account = createAccountFixture();
    it("returns action", () => {

      const actionExpected: AccountUpdateAction = {
        type: accountUpdateActionType,
        updatedAccount: account
      };


      expect(createAccountUpdateAction(account)).toEqual(actionExpected);

    });

  });

});
