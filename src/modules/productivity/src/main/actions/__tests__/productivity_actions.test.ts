import {Device} from "../../../_common/models/device";
import {
  initializeProductivityRestService,
  ProductivityRestService
} from "../../../_common/services/rest";
import * as fetchMock from "jest-fetch-mock";
import {
  createFetchDataAction,
  createFetchOverviewDataAction,
  createFetchOverviewDataFinishedAction,
  FETCH_OVERVIEW_DATA_ERROR,
  ProductivityActions
} from "../productivity_actions";
import {createLaunchPadErrorAction} from "../../../../../../app/actions/error";
import {CalloutError, CalloutErrorType, ErrorType, LaunchPadError} from "../../../../../../_common/error/error";
import {ThunkAction} from "redux-thunk";
import {createInitRootState, RootState} from "../../../../../../main/reducers/main";
import {Dispatch} from "redux";
import {createShowLaunchpadToastActionFromError} from "../../../../../../_common/components/launchpad_toast/actions/launchpad_toast";
import Mock = jest.Mock;
import { adamosHost } from "../../../../../../_common/rest/models/rest";

const createCalloutError = (error: Error) => new CalloutError(error.message, ErrorType.productivityCall, CalloutErrorType.error);

describe("ProductivityActions", () => {

  let dispatchMock: Mock<Dispatch>;
  let getStateMock: Mock<() => RootState>;
  let serviceMock: ProductivityRestService;
  let doneMock: Mock<() => void>;
  let actionsCreator: ThunkAction<void, RootState, void, ProductivityActions>;
  const host = adamosHost;

  beforeEach(() => {
    fetchMock.resetMocks();
    dispatchMock = jest.fn<Dispatch>();
    getStateMock = jest.fn<() => RootState>(() => createInitRootState());
    serviceMock = initializeProductivityRestService({fetch: fetchMock}, host);
    doneMock = jest.fn<() => void>();
    actionsCreator = createFetchDataAction(doneMock, serviceMock);
  });

  it("can't fetch data due to missing service", async () => {
    const error = new LaunchPadError("Service Not Available", ErrorType.productivityCall);
    actionsCreator = createFetchDataAction(doneMock, undefined as any);
    await actionsCreator(dispatchMock, getStateMock, undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(error));
    expect(dispatchMock).toHaveBeenCalledWith(createLaunchPadErrorAction(FETCH_OVERVIEW_DATA_ERROR, error));
  });

  it("fetches data on action", async () => {
    const data: Array<Device> = [];
    fetchMock.mockResponse(JSON.stringify({data}), {status: 200});
    await actionsCreator(dispatchMock, getStateMock, undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(createFetchOverviewDataAction());
    expect(dispatchMock).toHaveBeenCalledWith(createFetchOverviewDataFinishedAction(data));
  });

  it("fails to fetch due to http status 400", async () => {
    const error = new Error("Bad Request") as LaunchPadError;
    const calloutError = createCalloutError(error);
    fetchMock.mockRejectedValue(error);
    await actionsCreator(dispatchMock, getStateMock, undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenCalledWith(createFetchOverviewDataAction());
    expect(dispatchMock).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(calloutError));
    expect(dispatchMock).toHaveBeenCalledWith(createLaunchPadErrorAction(FETCH_OVERVIEW_DATA_ERROR, calloutError));
  });

  it("fails to fetch due to http status 404", async () => {
    const error = new Error("Not Found") as LaunchPadError;
    fetchMock.mockRejectedValue(error);
    const calloutError = createCalloutError(error);
    await actionsCreator(dispatchMock, getStateMock, undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenCalledWith(createFetchOverviewDataAction());
    expect(dispatchMock).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(calloutError));
    expect(dispatchMock).toHaveBeenCalledWith(createLaunchPadErrorAction(FETCH_OVERVIEW_DATA_ERROR, calloutError));
  });

  it("fails to fetch due to http status 415", async () => {
    const error = new Error("Unsupported Media Type") as LaunchPadError;
    fetchMock.mockRejectedValue(error);
    const calloutError = createCalloutError(error);
    await actionsCreator(dispatchMock, getStateMock, undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenCalledWith(createFetchOverviewDataAction());
    expect(dispatchMock).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(calloutError));
    expect(dispatchMock).toHaveBeenCalledWith(createLaunchPadErrorAction(FETCH_OVERVIEW_DATA_ERROR, calloutError));
  });

  it("fails to fetch due to http status 500", async () => {
    const error = new Error("Internal Server Error") as LaunchPadError;
    fetchMock.mockRejectedValue(error);
    const calloutError = createCalloutError(error);
    await actionsCreator(dispatchMock, getStateMock, undefined);
    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenCalledWith(createFetchOverviewDataAction());
    expect(dispatchMock).toHaveBeenCalledWith(createShowLaunchpadToastActionFromError(calloutError));
    expect(dispatchMock).toHaveBeenCalledWith(createLaunchPadErrorAction(FETCH_OVERVIEW_DATA_ERROR, calloutError));
  });

});
