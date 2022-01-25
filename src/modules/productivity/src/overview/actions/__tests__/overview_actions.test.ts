import {default as ProductivityDetails} from "../../../details/containers/Details";
import {createNavigateToDetailsAction} from "../overview_actions";
import {createNavigateForwardAction} from "../../../../../../app/actions/routing";
import {createOpenDeviceDetailsAction} from "../../../_common/actions/actions";
import {Device} from "../../../_common/models/device";

describe("OverviewActionsCreator", () => {

  it("creates a device selection action", async () => {
    const data: Device = {
      type: "devices",
      id: 4711,
      attributes: {}
    };
    const actionsCreator = createNavigateToDetailsAction(data);
    const dispatchMock = jest.fn();
    await actionsCreator(dispatchMock, jest.fn(), void 0);
    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(createNavigateForwardAction({
      component: ProductivityDetails,
      props: {
        key: `${data.id}`
      }
    }));
    expect(dispatchMock).toHaveBeenCalledWith(createOpenDeviceDetailsAction(data));
  });

});
