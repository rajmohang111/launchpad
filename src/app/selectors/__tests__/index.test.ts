import { getGlobal, getModules, getRouting } from "../index";
import {createInitRootState, RootState} from "../../../main/reducers/main";
import {ModulesState} from "../../reducers/modules";
import {GlobalState} from "../../reducers/global";

describe("AppSelectors", () => {

  const testInitState: RootState = createInitRootState();

  it("returns the global state", () => {
    const global: GlobalState | undefined = getGlobal(testInitState);
    expect(global).toBeTruthy();
  });

  it("should fail to return the global state", () => {
    const testState: RootState = {} as RootState;
    const global: GlobalState | undefined = getGlobal(testState);
    expect(global).toBeFalsy();
  });

  it("returns the modules state", () => {
    const modules: ModulesState | undefined = getModules(testInitState);
    expect(modules).toBeTruthy();
  });

  it("should fail to return the modules state", () => {
    const testState: RootState = {} as RootState;
    const modules: ModulesState | undefined = getModules(testState);
    expect(modules).toBeFalsy();
  });

  it("returns routing state", () => {

    expect(getRouting(testInitState)).toEqual(testInitState.global.routing);

  });

});
