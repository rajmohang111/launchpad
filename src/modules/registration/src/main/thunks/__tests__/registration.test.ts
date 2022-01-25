import {
  createSharedAccountRestServiceFixture,
  SharedAccountRestServiceFixture
} from "../../../../../../_common/rest/models/__fixture__/settings";
import { Account } from "../../../../../../_common/models/settings";
import {
  createRegistrationErrorAction,
  createRegistrationPendingAction,
  createRegistrationSuccessAction
} from "../../actions/registration";
import { createNavigateBackAction } from "../../../../../../app/actions/routing";
import { CalloutError, CalloutErrorType, ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import {
  createAccountAction,
  determineMessageIdFromCalloutError,
  regSuccessMessageId,
  userNameAlreadyExistsMessageID
} from "../registration";
import {
  createShowLaunchpadToastAction,
  createShowLaunchpadToastActionFromError,
  launchpadToastDefaultDismissId
} from "../../../../../../_common/components/launchpad_toast/actions/launchpad_toast";
import { technicalUser } from "../../../../../../_common/rest/models/rest";
import { LaunchpadToastType } from "../../../../../../_common/models/launchpad_toast";
import { determineHost } from "../../../../../../_common/selectors/settings";
import { createAccountFixture } from "../../../../../../_common/models/__fixture__/settings";
import { createPlaceHolderValues } from "../../../../../../_common/components/launchpad_toast/services/launchpad_toast";

describe("Registration Thunk", () => {

  const accountRestService: SharedAccountRestServiceFixture = createSharedAccountRestServiceFixture();
  const dispatch = jest.fn();
  const createdAccount: Account = createAccountFixture();

  beforeEach(() => {
    dispatch.mockReset();
    accountRestService.createAccount.mockReset();
  });

  describe("determineMessageIdFromCalloutError", () => {

    it("returns messageId for already existing user", () => {
      const alreadyExistingUserError = new CalloutError("Rest Error", ErrorType.accountRestService, CalloutErrorType.conflict);
      const errorIdExpected = userNameAlreadyExistsMessageID;

      const errorIdReturned = determineMessageIdFromCalloutError(alreadyExistingUserError);

      expect(errorIdReturned).toEqual(errorIdExpected);

    });

    it("returns messageId for other error", () => {
      const alreadyExistingUserError = new CalloutError("Rest Error", ErrorType.accountRestService, CalloutErrorType.forbidden);

      const errorIdReturned = determineMessageIdFromCalloutError(alreadyExistingUserError);

      expect(errorIdReturned).not.toBeUndefined();
    });

  });

  describe("createAccountAction", () => {

    it("creates account and dispatches associated actions", async () => {

      await createAccountAction(createdAccount, accountRestService)(dispatch, jest.fn(), undefined);
      expect(accountRestService.createAccount).toHaveBeenCalledWith(technicalUser, createdAccount, determineHost(createdAccount.credential.region));
      expect(dispatch).toHaveBeenCalledWith(createRegistrationPendingAction());
      expect(dispatch).toHaveBeenCalledWith(createShowLaunchpadToastAction(regSuccessMessageId, launchpadToastDefaultDismissId, LaunchpadToastType.info));
      expect(dispatch).toHaveBeenCalledWith(createRegistrationSuccessAction(createdAccount));
      expect(dispatch).toHaveBeenCalledWith(createNavigateBackAction());
    });

    it("dispatches registration error action in case account could not be created in backend", async () => {

      const errorExpected = new LaunchPadError("Rest Error", ErrorType.accountRestService);
      accountRestService.createAccount.mockRejectedValue(errorExpected);

      await createAccountAction(createdAccount, accountRestService)(dispatch, jest.fn(), undefined);

      expect(dispatch).toHaveBeenCalledWith(createRegistrationErrorAction(errorExpected, createdAccount));
      expect(dispatch).toHaveBeenCalledWith(createRegistrationPendingAction());
      expect(dispatch).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(errorExpected));
    });

    it("dispatches duplicate username error in case username already exists", async () => {

      const errorExpected = new CalloutError("Rest Error", ErrorType.accountRestService, CalloutErrorType.conflict);
      accountRestService.createAccount.mockRejectedValue(errorExpected);

      await createAccountAction(createdAccount, accountRestService)(dispatch, jest.fn(), undefined);

      expect(dispatch).toHaveBeenCalledWith(createRegistrationErrorAction(errorExpected, createdAccount));
      expect(dispatch).toHaveBeenCalledWith(createRegistrationPendingAction());
      expect(dispatch).toHaveBeenCalledWith(createShowLaunchpadToastAction(userNameAlreadyExistsMessageID, launchpadToastDefaultDismissId, LaunchpadToastType.error, createPlaceHolderValues(errorExpected)));
    });

  });

});
