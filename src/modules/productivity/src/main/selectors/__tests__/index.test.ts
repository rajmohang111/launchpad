import {getProductivity} from "../index";
import {createInitRootState, RootState} from "../../../../../../main/reducers/main";
import {ModulesState} from "../../../../../../app/reducers/modules";
import {ProductivityState} from "../../reducers";

describe("ProductivitySelectors", () => {

  const testInitState: RootState = createInitRootState();

  it("returns the productivity state", () => {
    const productivity: ProductivityState | undefined = getProductivity(testInitState);
    expect(productivity).toBeTruthy();
  });

  it("should fail to return the productivity state", () => {
    const testState: RootState = {
      ...testInitState,
      modules: {} as ModulesState
    };
    delete testState.modules;
    const productivity: ProductivityState | undefined = getProductivity(testState);
    expect(productivity).toBeFalsy();
  });

});
