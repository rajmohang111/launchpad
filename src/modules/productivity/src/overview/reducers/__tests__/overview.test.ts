import { advanceBy, advanceTo, clear } from "jest-date-mock";
import { createProductivityOverviewInitState, overviewReducer, ProductivityOverviewState } from "../overview";
import { createLaunchPadErrorAction } from "../../../../../../app/actions/error";
import { ErrorType, LaunchPadError } from "../../../../../../_common/error/error";
import { Device } from "../../../_common/models/device";
import {
  createFetchOverviewDataAction,
  createFetchOverviewDataFinishedAction,
  FETCH_OVERVIEW_DATA_ERROR,
} from "../../../main/actions/productivity_actions";
import { RELOAD_OVERVIEW_DATA, SWITCH_DATA_DISPLAY } from "../../../_common/actions/actions";
import { createCloseDetailsViewAction } from "../../../details/actions/details_actions";
import { createLogoutAction } from "../../../../../settings/src/account/actions/account";

describe("ProductivityOverviewReducer", () => {

  beforeEach(() => {
    advanceTo();
  });

  afterEach(() => {
    clear();
  });

  it("creates the initial state without errors", () => {
    const initState = createProductivityOverviewInitState();
    expect<ProductivityOverviewState>(initState).toBeTruthy();
  });

  it("updates the state with new productivity data", () => {
    const newData: Array<Device> = [
      {
        type: "devices",
        id: 4711,
        attributes: {}
      },
      {
        type: "devices",
        id: 4712,
        attributes: {}
      },
    ];
    const expectedState: ProductivityOverviewState = {
      ...createProductivityOverviewInitState(),
      data: newData,
      shouldLoadDevices: false,
      lastUpdated: 3000,
    };
    advanceBy(3000);
    expect<ProductivityOverviewState>(overviewReducer(
      createProductivityOverviewInitState(),
      createFetchOverviewDataFinishedAction(newData)
    )).toEqual(expectedState);
  });

  it("updates the state with error", () => {
    const newError: LaunchPadError = new LaunchPadError(
      "Error for testing purposes",
      ErrorType.backendCallError
    );
    advanceBy(3000);
    const expectedState: ProductivityOverviewState = {
      ...createProductivityOverviewInitState(),
      error: newError,
      lastUpdated: 3000,
    };
    expect<ProductivityOverviewState>(overviewReducer(
      createProductivityOverviewInitState(),
      createLaunchPadErrorAction(FETCH_OVERVIEW_DATA_ERROR, newError)
    )).toEqual(expectedState);
  });

  describe("data", () => {

    const data: Array<Device> = [
      {
        type: "devices",
        id: 4711,
        attributes: {}
      },
      {
        type: "devices",
        id: 4712,
        attributes: {}
      },
    ];

    it("leaves data set when fetching starts", () => {
      const expectedState: ProductivityOverviewState = {
        ...createProductivityOverviewInitState(),
        data,
        isRunning: true,
      };
      expect<ProductivityOverviewState>(overviewReducer(
        {
          ...createProductivityOverviewInitState(),
          data
        },
        createFetchOverviewDataAction()
      )).toEqual(expectedState);
    });

  });

  describe("error", () => {
    it("should reset error", () => {
      const expectedState: ProductivityOverviewState = {
        ...createProductivityOverviewInitState(),
        isRunning: true,
      };
      expect<ProductivityOverviewState>(overviewReducer(
        {
          ...createProductivityOverviewInitState(),
          error: new Error(),
        },
        createFetchOverviewDataAction()
      )).toEqual(expectedState);
    });

    it("should set error", () => {
      const error = new Error();
      const expectedState: ProductivityOverviewState = {
        ...createProductivityOverviewInitState(),
        isRunning: false,
        error,
      };
      expect<ProductivityOverviewState>(overviewReducer(
        {
          ...createProductivityOverviewInitState(),
          isRunning: true,
        },
        createLaunchPadErrorAction(FETCH_OVERVIEW_DATA_ERROR, error as LaunchPadError)
      )).toEqual(expectedState);
    });
  });

  describe("isRunning", () => {
    it("should set it to true", () => {
      const expectedState: ProductivityOverviewState = {
        ...createProductivityOverviewInitState(),
        isRunning: true,
      };
      expect(overviewReducer(
        createProductivityOverviewInitState(),
        createFetchOverviewDataAction()
      )).toEqual(expectedState);
    });

    it("should set it to false on success", () => {
      const initialState: ProductivityOverviewState = {
        ...createProductivityOverviewInitState(),
        isRunning: true,
      };
      const expectedState: ProductivityOverviewState = {
        ...initialState,
        isRunning: false,
        data: [],
        shouldLoadDevices: false,
      };
      expect(overviewReducer(
        createProductivityOverviewInitState(),
        createFetchOverviewDataFinishedAction([])
      )).toEqual(expectedState);
    });

    it("should set it to false on error", () => {
      const initialState: ProductivityOverviewState = {
        ...createProductivityOverviewInitState(),
        isRunning: true,
      };
      const expectedState: ProductivityOverviewState = {
        ...initialState,
        isRunning: false,
      };
      expect(overviewReducer(
        createProductivityOverviewInitState(),
        createLaunchPadErrorAction(FETCH_OVERVIEW_DATA_ERROR, null as any)
      )).toEqual(expectedState);
    });
  });

  describe("shouldLoadDevices", () => {

    it("should reload the devices", () => {
      const expectedState: ProductivityOverviewState = createProductivityOverviewInitState();
      expect<ProductivityOverviewState>(overviewReducer(
        {
          ...createProductivityOverviewInitState(),
          shouldLoadDevices: false
        },
        {
          type: RELOAD_OVERVIEW_DATA
        }
      )).toEqual(expectedState);
    });

    it("is set to true when closing details page", () => {
      const expectedState: ProductivityOverviewState = createProductivityOverviewInitState();
      const stateWithShouldLoadDevicesFalse: ProductivityOverviewState = {
        ...expectedState,
        shouldLoadDevices: false
      };

      const stateReturned = overviewReducer(stateWithShouldLoadDevicesFalse, createCloseDetailsViewAction());

      expect(stateReturned).toEqual(expectedState);

    });

    it("is set to true when use logs out", () => {
      const expectedState: ProductivityOverviewState = createProductivityOverviewInitState();
      const stateWithShouldLoadDevicesFalse: ProductivityOverviewState = {
        ...expectedState,
        shouldLoadDevices: false
      };

      const stateReturned = overviewReducer(stateWithShouldLoadDevicesFalse, createLogoutAction());

      expect(stateReturned).toEqual(expectedState);

    });

  });

  describe("displayMetersPerHour", () => {

    it("should switch the display", () => {
      const expectedState: ProductivityOverviewState = {
        ...createProductivityOverviewInitState(),
        displayMetersPerHour: true
      };
      expect<ProductivityOverviewState>(overviewReducer(
        createProductivityOverviewInitState(),
        {
          type: SWITCH_DATA_DISPLAY,
          displayMetersPerHour: true
        }
      )).toEqual(expectedState);
    });
  });

});
