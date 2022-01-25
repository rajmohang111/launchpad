import { update } from "lodash";
import {
  createCloseDetailsAndNavigateBackAction,
  createCloseDetailsViewAction,
  createFetchDeviceMeasurementsAction,
  createNavigateEditAction,
  createShouldFetchDeviceMeasurementsAction,
  createToggleDetailsSwitchAction,
  createToggleDetailsSwitchActionNoThunk,
  createUpdateDeviceOrientationAction,
  DetailsActions,
  FETCH_DEVICE_MEASUREMENTS_ERROR,
  UPDATE_DEVICE_ORIENTATION,
} from "../details_actions";
import { createNavigateBackAction, createNavigateForwardAction } from "../../../../../../app/actions/routing";
import { Device } from "../../../_common/models/device";
import { ModuleRoutes } from "../../../main/models/modules";
import { createOpenEditDetailsAction } from "../../../_common/actions/actions";
import { fromModuleSelection } from "../../../../../../_common/routing/routing";
import { ProductivityDetailsState } from "../../reducers/details";
import { createInitRootState, RootState } from "../../../../../../main/reducers/main";
import * as fetchMock from "jest-fetch-mock";
import { initializeProductivityRestService, ProductivityRestService } from "../../../_common/services/rest";
import { ThunkAction } from "redux-thunk";
import { Dispatch } from "redux";
import { createLaunchPadErrorAction } from "../../../../../../app/actions/error";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import { createShowLaunchpadToastActionFromError } from "../../../../../../_common/components/launchpad_toast/actions/launchpad_toast";
import { DEVICE_ORIENTATION } from "../../../../../../_common/models/device_orientation";
import Mock = jest.Mock;
import { adamosHost } from "../../../../../../_common/rest/models/rest";

describe("DetailsActionsCreator", () => {

  it("creates a close details and navigateBack action", async () => {
    const actionsCreator = createCloseDetailsAndNavigateBackAction();
    const dispatchMock = jest.fn();
    await actionsCreator(dispatchMock, jest.fn(), undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(createNavigateBackAction());
    expect(dispatchMock).toHaveBeenCalledWith(createCloseDetailsViewAction());
  });

  describe("createNavigateEditAction", () => {

    const data = {} as Device;
    const testState: RootState = createInitRootState();
    update(testState, "modules.productivity.details", (details: ProductivityDetailsState) => ({
      ...details,
      data
    }));
    it("should create a open edit request", async () => {
      const actionsCreator = createNavigateEditAction(ModuleRoutes.edit);
      const dispatchMock = jest.fn();
      await actionsCreator(dispatchMock, () => testState, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(2);
      expect(dispatchMock).toHaveBeenCalledWith(createOpenEditDetailsAction(data));
      expect(dispatchMock).toHaveBeenCalledWith(createNavigateForwardAction(fromModuleSelection(ModuleRoutes.edit)));
    });

  });

  describe("createToggleDetailsSwitchAction", () => {

    it("creates the action with displayMetersPerHour = false", async () => {
      const actionsCreator = createToggleDetailsSwitchAction(false);
      const dispatchMock = jest.fn<Dispatch>();
      const stateMock = jest.fn<() => RootState>();
      await actionsCreator(dispatchMock, stateMock, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(createToggleDetailsSwitchActionNoThunk(false));
    });

    it("creates the action with displayMetersPerHour = true", async () => {
      const actionsCreator = createToggleDetailsSwitchAction(true);
      const dispatchMock = jest.fn<Dispatch>();
      const stateMock = jest.fn<() => RootState>();
      await actionsCreator(dispatchMock, stateMock, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(createToggleDetailsSwitchActionNoThunk(true));
    });

  });

  describe("createShouldFetchDeviceMeasurementsAction", () => {

    let serviceMock: ProductivityRestService;
    let actionsCreator: ThunkAction<void, RootState, void, DetailsActions>;
    let dispatchMock: Mock<Dispatch>;
    let testState: RootState;
    const host = adamosHost;

    beforeEach(() => {
      dispatchMock = jest.fn<Dispatch>();
      fetchMock.resetMocks();
      serviceMock = initializeProductivityRestService({fetch: fetchMock}, host);
      actionsCreator = createShouldFetchDeviceMeasurementsAction({
        type: "devices",
        id: 4711,
        attributes: {}
      }, serviceMock);
      testState = createInitRootState();
    });

    it("should fetch the data on action", async () => {
      fetchMock.mockResponse(JSON.stringify({data: []}), {status: 200});
      await actionsCreator(dispatchMock, () => testState, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(2);
      expect(dispatchMock).toHaveBeenCalledWith(createFetchDeviceMeasurementsAction());
    });

    it("fails to fetch due to http status 400", async () => {
      const error = new Error("Bad Request") as LaunchPadError;
      fetchMock.mockRejectedValue(error);
      await actionsCreator(dispatchMock, () => testState, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(3);
      expect(dispatchMock).toHaveBeenCalledWith(createFetchDeviceMeasurementsAction());
      expect(dispatchMock).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(error));
      expect(dispatchMock).toHaveBeenCalledWith(createLaunchPadErrorAction(FETCH_DEVICE_MEASUREMENTS_ERROR, error));
    });

    it("fails to fetch due to http status 404", async () => {
      const error = new Error("Not Found") as LaunchPadError;
      fetchMock.mockRejectedValue(error);
      await actionsCreator(dispatchMock, () => testState, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(3);
      expect(dispatchMock).toHaveBeenCalledWith(createFetchDeviceMeasurementsAction());
      expect(dispatchMock).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(error));
      expect(dispatchMock).toHaveBeenCalledWith(createLaunchPadErrorAction(FETCH_DEVICE_MEASUREMENTS_ERROR, error));
    });

    it("fails to fetch due to http status 406", async () => {
      const error = new Error("Not Acceptable") as LaunchPadError;
      fetchMock.mockRejectedValue(error);
      await actionsCreator(dispatchMock, () => testState, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(3);
      expect(dispatchMock).toHaveBeenCalledWith(createFetchDeviceMeasurementsAction());
      expect(dispatchMock).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(error));
      expect(dispatchMock).toHaveBeenCalledWith(createLaunchPadErrorAction(FETCH_DEVICE_MEASUREMENTS_ERROR, error));
    });

    it("fails to fetch due to missing service", async () => {
      const error = new LaunchPadError("Service Not Available", ErrorType.productivityCall);
      actionsCreator = createShouldFetchDeviceMeasurementsAction({
        type: "devices",
        id: 4711,
        attributes: {}
      }, undefined as any);
      await actionsCreator(dispatchMock, () => testState, undefined);
      expect(dispatchMock).toHaveBeenCalledTimes(2);
      expect(dispatchMock).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(error));
      expect(dispatchMock).toHaveBeenCalledWith(createLaunchPadErrorAction(FETCH_DEVICE_MEASUREMENTS_ERROR, error));
    });

  });

  describe("createUpdateDeviceOrientationAction", () => {

    it("creates the action with orientation = PORTRAIT", () => {
      const action = createUpdateDeviceOrientationAction(DEVICE_ORIENTATION.PORTRAIT);
      expect(action).toEqual({
        type: UPDATE_DEVICE_ORIENTATION,
        orientation: DEVICE_ORIENTATION.PORTRAIT,
      });
    });

    it("creates the action with orientation = LANDSCAPE", () => {
      const action = createUpdateDeviceOrientationAction(DEVICE_ORIENTATION.LANDSCAPE);
      expect(action).toEqual({
        type: UPDATE_DEVICE_ORIENTATION,
        orientation: DEVICE_ORIENTATION.LANDSCAPE,
      });
    });

  });

});
