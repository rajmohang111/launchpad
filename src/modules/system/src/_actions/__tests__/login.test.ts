import {Dispatch} from "redux";
import {
  createUpdateLoginRegionAction,
  createUpdateLoginRegionErrorAction,
  createUpdateLoginRegionSuccessAction,
  updateLoginRegionErrorActionType,
  updateLoginRegionSuccessActionType,
} from "../login";
import {Region} from "../../../../../_common/models/system";
import {ErrorType, LaunchPadError} from "../../../../../_common/error/error";
import {createInitRootState, RootState} from "../../../../../main/reducers/main";
import {SharedAccountDeviceStoreFixture, createSharedAccountDeviceStoreFixture} from "../../../../../_common/stores/__fixtures__/settings";
import Mock = jest.Mock;
import {Account} from "../../../../../_common/models/settings";
import {getAccount} from "../../../../../_common/selectors/settings";

describe("login actions", () => {

  const rootState: RootState = createInitRootState();
  const account: Account = getAccount(rootState);
  let mockStore: SharedAccountDeviceStoreFixture;
  let dispatchMock: Mock<Dispatch>;
  let getStateMock: Mock<RootState>;

  beforeEach(() => {
    mockStore = createSharedAccountDeviceStoreFixture();
    dispatchMock = jest.fn<Dispatch>();
    getStateMock = jest.fn<RootState>(() => createInitRootState());
  });

  describe("createUpdateLoginRegionAction()", () => {

    it("should save the region and create a success action", async () => {
      const expectedAccount: Account = {
        ...account,
        credential: {
          ...account.credential,
          region: Region.CHINA
        }
      };
      const actionCreator = createUpdateLoginRegionAction(Region.CHINA, mockStore);
      await actionCreator(dispatchMock, getStateMock, undefined);
      expect(mockStore.saveAccount).toHaveBeenCalledTimes(1);
      expect(mockStore.saveAccount).toHaveBeenCalledWith(expectedAccount);
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(createUpdateLoginRegionSuccessAction(Region.CHINA));
    });

    it("should fail to save the region and create an error action", async () => {
      const error = new LaunchPadError("Error for testing purposes", ErrorType.systemStore);
      const expectedAccount: Account = {
        ...account,
        credential: {
          ...account.credential,
          region: Region.CHINA
        }
      };
      mockStore.saveAccount.mockRejectedValue(error);
      const actionCreator = createUpdateLoginRegionAction(Region.CHINA, mockStore);
      await actionCreator(dispatchMock, getStateMock, undefined);
      expect(mockStore.saveAccount).toHaveBeenCalledTimes(1);
      expect(mockStore.saveAccount).toHaveBeenCalledWith(expectedAccount);
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(createUpdateLoginRegionErrorAction(error, Region.CHINA));
    });

  });

  it("createUpdateLoginRegionSuccessAction()", () => {
    const action = createUpdateLoginRegionSuccessAction(Region.CHINA);
    expect(action).toEqual({
      type: updateLoginRegionSuccessActionType,
      region: Region.CHINA,
    });
  });

  it("createUpdateLoginRegionErrorAction()", () => {
    const error = new LaunchPadError("Error for testing purposes", ErrorType.backendCallError);
    const action = createUpdateLoginRegionErrorAction(error, Region.CHINA);
    expect(action).toEqual({
      type: updateLoginRegionErrorActionType,
      error,
      region: Region.CHINA,
    });
  });

});
