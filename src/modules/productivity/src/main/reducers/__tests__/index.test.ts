import {createProductivityInitState, ProductivityState} from "../index";
import {createProductivityDetailsInitState} from "../../../details/reducers/details";
import {createProductivityOverviewInitState} from "../../../overview/reducers/overview";
import { createProductivityEditInitState } from "../../../edit/reducers/edit";
import { createProductivitySelectMachinesInitState } from "../../../selectmachines/reducers/selectmachines";

describe("ProductivityReducer", () => {

  it("creates the initial state without errors", () => {
    const expectedState: ProductivityState = {
      overview: createProductivityOverviewInitState(),
      details: createProductivityDetailsInitState(),
      edit: createProductivityEditInitState(),
      selectMachines: createProductivitySelectMachinesInitState()
    };
    expect<ProductivityState>(createProductivityInitState()).toEqual(expectedState);
  });

});
