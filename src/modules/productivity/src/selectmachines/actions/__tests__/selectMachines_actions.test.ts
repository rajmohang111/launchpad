import { update } from "lodash";
import {
  createCloseSelectMachinesAndNavigateBackAction,
  createSaveSelectMachinesAndNavigateBackAction,
  createSearchMachinesAction,
  createSelectMachineUpdateAction,
  SEARCH_MACHINES,
  UPDATE_MACHINE_SELECTION
} from "../selectMachines_actions";
import { createNavigateBackAction } from "../../../../../../app/actions/routing";
import {
  createSaveSelectMachineViewAction,
  createCloseSelectMachineViewAction
} from "../../../_common/actions/actions";
import { RootState, createInitRootState } from "../../../../../../main/reducers/main";
import { ProductivitySelectMachinesState } from "../../reducers/selectmachines";

describe("SelectMachinesActionsCreator", () => {

  it("creates a close select Machines and navigateBack action", async () => {
    const actionsCreator = createCloseSelectMachinesAndNavigateBackAction();
    const dispatchMock = jest.fn();
    await actionsCreator(dispatchMock, jest.fn(), undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(createNavigateBackAction());
    expect(dispatchMock).toHaveBeenCalledWith(createCloseSelectMachineViewAction());
  });

  it("creates a save machine selection and navigateBack action", async () => {
    const testState: RootState = createInitRootState();
    const deviceIds = [1233];
    update(testState, "modules.productivity.selectMachines", (selectMachines: ProductivitySelectMachinesState) => ({
      ...selectMachines,
      deviceIds
    }));
    const actionsCreator = createSaveSelectMachinesAndNavigateBackAction();
    const dispatchMock = jest.fn();
    await actionsCreator(dispatchMock, () => testState, undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(createNavigateBackAction());
    expect(dispatchMock).toHaveBeenCalledWith(createSaveSelectMachineViewAction(deviceIds));
  });

  it("create a search machine action", async () => {
    const searchParam = "test";
    const actionsCreator = createSearchMachinesAction(searchParam);
    const dispatchMock = jest.fn();
    await actionsCreator(dispatchMock, jest.fn(), undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      type: SEARCH_MACHINES,
      searchParam
    });
  });

  it("create a update machine selection ", async () => {
    const machineSelection = { selectStatus: true, id: 123 };
    const actionsCreator = createSelectMachineUpdateAction(machineSelection.selectStatus, machineSelection.id);
    expect(actionsCreator).toEqual({
      type: UPDATE_MACHINE_SELECTION,
      machineSelection
    });
  });

});
