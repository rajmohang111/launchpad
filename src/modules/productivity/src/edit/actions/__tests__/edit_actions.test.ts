import { update } from "lodash";
import {
  createCloseEditAndNavigateBackAction,
  createCloseEditViewAction,
  createSaveSettingsDataAction,
  SAVE_SETTINGS_DATA_STARTED,
  UPDATE_DEVICE_SETTINGS,
  createUpdateDeviceSettingsAction,
  createNavigateSelectMachinesAction,
  createSaveEditAndNavigateBackAction,
  SAVE_SETTINGS_DATA_ERROR,
} from "../edit_actions";
import { createNavigateBackAction, createNavigateForwardAction } from "../../../../../../app/actions/routing";
import { ModuleRoutes } from "../../../main/models/modules";
import { createOpenSelectMachinesAction, createSaveSettingsDataFinishedAction, createReloadOverviewDataAction } from "../../../_common/actions/actions";
import { fromModuleSelection } from "../../../../../../_common/routing/routing";
import { Device, SettingsAttributes } from "../../../_common/models/device";
import { ProductivityRestServiceFixture, createProductivityRestServiceFixture } from "../../../__fixture__/productivity";
import { LaunchPadError, ErrorType } from "../../../../../../_common/error/error";
import { createLaunchPadErrorAction } from "../../../../../../_common/actions/error";
import { createInitRootState, RootState } from "../../../../../../main/reducers/main";
import { ProductivityEditState } from "../../reducers/edit";
import { createShowLaunchpadToastActionFromError } from "../../../../../../_common/components/launchpad_toast/actions/launchpad_toast";
import { createDevice } from "../../../__fixture__/createDeviceData";

describe("EditActionsCreator", () => {

  const dispatch = jest.fn();
  let productivityRestService: ProductivityRestServiceFixture;

  beforeEach(() => {
    productivityRestService = createProductivityRestServiceFixture();
    dispatch.mockClear();
  });

  it("creates a close edit and navigateBack action", async () => {
    const actionsCreator = createCloseEditAndNavigateBackAction();
    const dispatchMock = jest.fn();
    await actionsCreator(dispatchMock, jest.fn(), undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(createNavigateBackAction());
    expect(dispatchMock).toHaveBeenCalledWith(createCloseEditViewAction());
  });

  it("create save settings data action", () => {
    const actionsCreator = createSaveSettingsDataAction();
    expect(actionsCreator).toEqual({
      type: SAVE_SETTINGS_DATA_STARTED,
    });
  });

  it("create update device settings", () => {
    const settingsAttributes: SettingsAttributes = {} as SettingsAttributes;
    const actionsCreator = createUpdateDeviceSettingsAction(settingsAttributes);
    expect(actionsCreator).toEqual({
      type: UPDATE_DEVICE_SETTINGS,
      settingsAttributes
    });
  });

  it("create navigate to select machines Action", async () => {
    const deviceIds: Array<number> = [123];
    const actionsCreator = createNavigateSelectMachinesAction(deviceIds, ModuleRoutes.selectMachine);
    const dispatchMock = jest.fn();
    await actionsCreator(dispatchMock, jest.fn(), undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(createOpenSelectMachinesAction(deviceIds));
    expect(dispatchMock).toHaveBeenCalledWith(createNavigateForwardAction(fromModuleSelection(ModuleRoutes.selectMachine)));
  });

  describe("createSaveEditAndNavigateBackAction", () => {

    const device: Device = createDevice(1);
    const selectedDeviceIds: Array<number> = [123455];
    const testState: RootState = createInitRootState();
    update(testState, "modules.productivity.edit", (edit: ProductivityEditState) => ({
      ...edit,
      device,
      selectedDeviceIds
    }));

    it("create save edit and navigate back action", async () => {

      const actionsCreator = createSaveEditAndNavigateBackAction(productivityRestService);
      const dispatchMock = jest.fn();
      await actionsCreator(dispatchMock, () => testState, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(4);
      expect(dispatchMock).toHaveBeenCalledWith(createSaveSettingsDataAction());
      expect(dispatchMock).toHaveBeenCalledWith(createNavigateBackAction());
      expect(dispatchMock).toHaveBeenCalledWith(createSaveSettingsDataFinishedAction(device));
      expect(dispatchMock).toHaveBeenCalledWith(createReloadOverviewDataAction());
    });

    it("should dispatch error once the service returns a error", async () => {

      const error = new LaunchPadError("Error", ErrorType.backendCallError);
      productivityRestService.updateDevice.mockRejectedValue(error);
      const actionsCreator = createSaveEditAndNavigateBackAction(productivityRestService);
      const dispatchMock = jest.fn();
      await actionsCreator(dispatchMock, () => testState, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(3);
      expect(dispatchMock).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(error));
      expect(dispatchMock).toHaveBeenCalledWith(createLaunchPadErrorAction(SAVE_SETTINGS_DATA_ERROR, error));
    });

  });

});
