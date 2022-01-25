import {Dispatch} from "redux";
import Mock = jest.Mock;
import {
  createUpdateRegistrationRegionAction,
  createUpdateRegistrationRegionErrorAction,
  createUpdateRegistrationRegionSuccessAction,
  updateRegistrationRegionErrorActionType,
  updateRegistrationRegionSuccessActionType,
} from "../registration";
import {Region} from "../../../../../_common/models/system";
import {ErrorType, LaunchPadError} from "../../../../../_common/error/error";
import {Account} from "../../../../../_common/models/settings";
import {createInitRootState, RootState} from "../../../../../main/reducers/main";
import {SharedAccountDeviceStoreFixture, createSharedAccountDeviceStoreFixture} from "../../../../../_common/stores/__fixtures__/settings";
import {getAccount} from "../../../../../_common/selectors/settings";

describe("registration actions", () => {

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

  describe("createUpdateRegistrationRegionAction()", () => {

    it("should create the action", async () => {
      const expectedAccount: Account = {
        ...account,
        credential: {
          ...account.credential,
          region: Region.CHINA
        }
      };
      const actionCreator = createUpdateRegistrationRegionAction(Region.CHINA, mockStore);
      await actionCreator(dispatchMock, getStateMock, undefined);
      expect(mockStore.saveAccount).toHaveBeenCalledTimes(1);
      expect(mockStore.saveAccount).toHaveBeenCalledWith(expectedAccount);
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(createUpdateRegistrationRegionSuccessAction(Region.CHINA));
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
      const actionCreator = createUpdateRegistrationRegionAction(Region.CHINA, mockStore);
      await actionCreator(dispatchMock, getStateMock, undefined);
      expect(mockStore.saveAccount).toHaveBeenCalledTimes(1);
      expect(mockStore.saveAccount).toHaveBeenCalledWith(expectedAccount);
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(createUpdateRegistrationRegionErrorAction(error, Region.CHINA));
    });

  });

  it("createUpdateRegistrationRegionSuccessAction", () => {
    const action = createUpdateRegistrationRegionSuccessAction(Region.CHINA);
    expect(action).toEqual({
      type: updateRegistrationRegionSuccessActionType,
      region: Region.CHINA,
    });
  });

  it("createUpdateRegistrationRegionErrorAction", () => {
    const error = new LaunchPadError("Error for testing purposes", ErrorType.backendCallError);
    const action = createUpdateRegistrationRegionErrorAction(error, Region.CHINA);
    expect(action).toEqual({
      type: updateRegistrationRegionErrorActionType,
      error,
      region: Region.CHINA,
    });
  });

});
