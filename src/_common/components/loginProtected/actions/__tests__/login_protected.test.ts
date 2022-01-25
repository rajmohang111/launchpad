import { AppModule, createModuleSelectionWithRedirect } from "../../../../models/module";
import { createNavigateWithReplaceAction } from "../../../../../app/actions/routing";
import { fromModuleSelection } from "../../../../routing/routing";
import { createNavigateToLoginAction } from "../login_protected";

describe("Login Protected actions", () => {

  describe("performNavigate", () => {

    const redirectModule: AppModule = AppModule.productivity;
    it("performs navigation to login module", () => {

      const navigateActionExpected = createNavigateWithReplaceAction(fromModuleSelection(
        createModuleSelectionWithRedirect(AppModule.login, redirectModule)
      ));

      const navigateActionReturned = createNavigateToLoginAction(redirectModule);

      expect(navigateActionReturned).toEqual(navigateActionExpected);

    });

  });

});
