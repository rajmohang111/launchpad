import {
  createProductivitySelectMachinesInitState,
  ProductivitySelectMachinesState,
  selectMachinesReducer
} from "../selectmachines";
import {
  UPDATE_MACHINE_SELECTION,
  SEARCH_MACHINES,
} from "../../actions/selectMachines_actions";
import {
  createCloseSelectMachineViewAction,
  OPEN_SELECT_MACHINES,
  SAVE_SELECTED_MACHINES
} from "../../../_common/actions/actions";

describe("SelectMachinesReducer", () => {

  describe("Init state", () => {

    it("creates the initial state", () => {
      const initState: ProductivitySelectMachinesState = createProductivitySelectMachinesInitState();
      expect(initState).toBeTruthy();
    });

  });

  describe("deviceIds", () => {

    it("should add deviceId to deviceIds", () => {

      const machineSelection = { selectStatus: true, id: 123 };
      const expectedState: ProductivitySelectMachinesState = {
        ...createProductivitySelectMachinesInitState(),
        deviceIds: [machineSelection.id]
      };
      expect<ProductivitySelectMachinesState>(selectMachinesReducer(
        createProductivitySelectMachinesInitState(),
        {
          type: UPDATE_MACHINE_SELECTION,
          machineSelection
        }
      )).toEqual(expectedState);
    });

    it("should remove deviceId to deviceIds", () => {

      const machineSelection = { selectStatus: false, id: 123 };
      const expectedState: ProductivitySelectMachinesState = {
        ...createProductivitySelectMachinesInitState(),
        deviceIds: []
      };
      expect<ProductivitySelectMachinesState>(selectMachinesReducer(
        {
          ...createProductivitySelectMachinesInitState(),
          deviceIds: [123]
        },
        {
          type: UPDATE_MACHINE_SELECTION,
          machineSelection
        }
      )).toEqual(expectedState);
    });

    it("should not add duplicate devicesId to the list", () => {
      const machineSelection = { selectStatus: true, id: 123 };
      const expectedState: ProductivitySelectMachinesState = {
        ...createProductivitySelectMachinesInitState(),
        deviceIds: [123, 456, 678]
      };
      expect<ProductivitySelectMachinesState>(selectMachinesReducer(
        {
          ...createProductivitySelectMachinesInitState(),
          deviceIds: [123, 456, 678]
        },
        {
          type: UPDATE_MACHINE_SELECTION,
          machineSelection
        }
      )).toEqual(expectedState);
    });

    it("should load the selected machines when loading", () => {
      const expectedState: ProductivitySelectMachinesState = {
        ...createProductivitySelectMachinesInitState(),
        deviceIds: [123, 456]
      };
      expect<ProductivitySelectMachinesState>(selectMachinesReducer(
        {
          ...createProductivitySelectMachinesInitState(),
        },
        {
          type: OPEN_SELECT_MACHINES,
          deviceIds: [123, 456]
        }
      )).toEqual(expectedState);
    });

    it("should reset the selected device after save", () => {
      const expectedState: ProductivitySelectMachinesState = {
        ...createProductivitySelectMachinesInitState(),
        deviceIds: []
      };
      expect<ProductivitySelectMachinesState>(selectMachinesReducer(
        {
          ...createProductivitySelectMachinesInitState(),
        },
        {
          type: SAVE_SELECTED_MACHINES,
        }
      )).toEqual(expectedState);
    });

  });

  describe("searchParam", () => {
    const searchParam = "test";

    it("update the search param", () => {
      const expectedState: ProductivitySelectMachinesState = {
        ...createProductivitySelectMachinesInitState(),
        searchParam
      };
      expect<ProductivitySelectMachinesState>(selectMachinesReducer(
        createProductivitySelectMachinesInitState(),
        {
          type: SEARCH_MACHINES,
          searchParam
        }
      )).toEqual(expectedState);
    });

    it("remove the search param", () => {
      const expectedState: ProductivitySelectMachinesState = createProductivitySelectMachinesInitState();
      expect<ProductivitySelectMachinesState>(selectMachinesReducer(
        {
          ...createProductivitySelectMachinesInitState(),
          searchParam
        },
        createCloseSelectMachineViewAction()
      )).toEqual(expectedState);
    });

    it("should clear the search param once save is complete", () => {
      const expectedState: ProductivitySelectMachinesState = {
        ...createProductivitySelectMachinesInitState(),
        searchParam: null
      };
      expect<ProductivitySelectMachinesState>(selectMachinesReducer(
        {
          ...createProductivitySelectMachinesInitState(),
          searchParam: "tests"
        },
        {
          type: SAVE_SELECTED_MACHINES,
        }
      )).toEqual(expectedState);
    });

  });

});
