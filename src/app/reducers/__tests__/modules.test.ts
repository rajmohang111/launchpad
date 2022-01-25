import { createModulesInitState, ModulesState } from "../modules";
import { createLaunchPadInitState } from "../../../modules/launchpad/src/main/reducers/launchpad";
import { createSlideInitState } from "../../../modules/tutorials/src/main/reducers/tutorial";
import { createSettingsInitState } from "../../../modules/settings/src/main/reducers/settings";
import { createProductivityInitState } from "../../../modules/productivity/src/main/reducers";
import { createLoginInitState } from "../../../modules/login/src/Login/reducers/login";
import { createRegistrationInitState } from "../../../modules/registration/src/main/reducers/registration";

describe("Modules Reducer", () => {

  describe("createModulesInitState", () => {

    it("returns init state", () => {


      const stateExpected: ModulesState = {

        tutorial: createSlideInitState(),
        launchPad: createLaunchPadInitState(),
        settings: createSettingsInitState(),
        productivity: createProductivityInitState(),
        login: createLoginInitState(),
        registration: createRegistrationInitState()
      };

      expect(createModulesInitState()).toEqual(stateExpected);

    });

  });

});
