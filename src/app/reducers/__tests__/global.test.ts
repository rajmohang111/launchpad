import * as OnsenMock from "../../../__mocks__/react-onsenui";
jest.mock("react-onsenui", () => OnsenMock);

import { createGlobalInitState, GlobalState } from "../global";
import { createTranslationsInitState } from "../translations";
import { createRouterInitState } from "../routing";
import { createSystemInitState } from "../system";
import { createLaunchpadToastInitState } from "../../../_common/components/launchpad_toast/reducers/launchpad_toast";

describe("Global Reducer", () => {

  describe("createGlobalInitState", () => {

    it("creates init state", () => {

      const stateExpected: GlobalState = {
        translations: createTranslationsInitState(),
        routing: createRouterInitState(),
        system: createSystemInitState(),
        launchpadToast: createLaunchpadToastInitState()
      };

      expect(createGlobalInitState()).toEqual(stateExpected);
    });


  });

});
