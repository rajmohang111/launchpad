import { fromModuleSelection } from "../../../../../../_common/routing/routing";
import { createNavigateForwardAction, NavigateForwardAction } from "../../../../../../app/actions/routing";

import { createSelectAccountModuleAction, createSettingsSelectionAction } from "../settings";
import { createSettingsModuleSelection, SettingsModule } from "../../models/module";
import { Route } from "react-onsenui";
import { createCredentialFixture } from "../../../../../../_common/rest/__fixtures__/rest";
import { Credential } from "../../../../../../_common/rest/models/rest";


describe("Settings Actions", () => {

  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  describe("createSettingsSelectionAction", () => {

    const selectedModule: SettingsModule = SettingsModule.PREFERENCES;

    it("dispatches navigation actions from settings selection", () => {

      const actionExpected: NavigateForwardAction = createNavigateForwardAction(fromModuleSelection(createSettingsModuleSelection(selectedModule)));

      const actionReturned = createSettingsSelectionAction(selectedModule);

      expect(actionReturned).toEqual(actionExpected);

    });

  });

  describe("createSelectAccountModuleAction", () => {

    const credential: Credential = createCredentialFixture();

    it("dispatches loading of account data and navigates to account module", async () => {

      const routeExpected: Route = fromModuleSelection(createSettingsModuleSelection(SettingsModule.ACCOUNT));

      await createSelectAccountModuleAction(credential)(dispatch, jest.fn(), undefined);

      expect(dispatch).toHaveBeenCalledWith(createNavigateForwardAction(routeExpected));

    });

  });

});
