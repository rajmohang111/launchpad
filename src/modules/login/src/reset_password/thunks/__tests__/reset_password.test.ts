import {
  createSharedAccountRestServiceFixture,
  SharedAccountRestServiceFixture
} from "../../../../../../_common/rest/models/__fixture__/settings";
import { Region } from "../../../../../../_common/models/system";
import { resetPassword } from "../reset_password";
import { determineHost } from "../../../../../../_common/selectors/settings";
import {
  createSharedAccountDeviceStoreFixture,
  SharedAccountDeviceStoreFixture
} from "../../../../../../_common/stores/__fixtures__/settings";
import {
  createResetPasswordErrorAction,
  createResetPasswordPendingAction,
  createResetPasswordSuccessAction
} from "../../actions/reset_password";
import { CalloutError, CalloutErrorType, ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import { technicalUser } from "../../../../../../_common/rest/models/rest";
import { createNavigateBackAction } from "../../../../../../app/actions/routing";

describe("Reset Password Thunk", () => {

  describe("resetPassword", () => {

    const accountResetService: SharedAccountRestServiceFixture = createSharedAccountRestServiceFixture();
    const accountDeviceStore: SharedAccountDeviceStoreFixture = createSharedAccountDeviceStoreFixture();
    const dispatch = jest.fn();
    const eMail = "test@test.de";
    const region = Region.OTHER;

    beforeEach(() => {
      accountResetService.resetPassword.mockClear();
      accountDeviceStore.clear.mockClear();
    });

    it("triggers password reset and logs out", async () => {

      await resetPassword(eMail, region, accountResetService, accountDeviceStore)(dispatch, jest.fn(), undefined);

      expect(accountResetService.resetPassword).toHaveBeenCalledWith(eMail, determineHost(region), technicalUser);
      expect(accountDeviceStore.clear).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(createResetPasswordPendingAction());
      expect(dispatch).toHaveBeenCalledWith(createResetPasswordSuccessAction(eMail));
      expect(dispatch).toHaveBeenCalledWith(createNavigateBackAction());
    });

    it("dispatches error action in case resetting password on platform fails", async () => {

      const error = new CalloutError("test", ErrorType.accountRestService, CalloutErrorType.error);
      accountResetService.resetPassword.mockRejectedValue(error);

      await resetPassword(eMail, region, accountResetService, accountDeviceStore)(dispatch, jest.fn(), undefined);

      expect(accountResetService.resetPassword).toHaveBeenCalledWith(eMail, determineHost(region), technicalUser);
      expect(accountDeviceStore.clear).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(createResetPasswordPendingAction());
      expect(dispatch).toHaveBeenCalledWith(createResetPasswordErrorAction(eMail, error));
    });

    it("dispatches error action in case logout in mobile app fails", async () => {

      const error = new LaunchPadError("test", ErrorType.accountDeviceStore);
      accountDeviceStore.clear.mockRejectedValue(error);

      await resetPassword(eMail, region, accountResetService, accountDeviceStore)(dispatch, jest.fn(), undefined);

      expect(accountResetService.resetPassword).not.toHaveBeenCalledWith(eMail, determineHost(region), technicalUser);
      expect(accountDeviceStore.clear).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(createResetPasswordPendingAction());
      expect(dispatch).toHaveBeenCalledWith(createResetPasswordErrorAction(eMail, error));
    });

  });

});
