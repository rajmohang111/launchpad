import { ModuleSelection } from "../../../../../_common/models/module";
import Edit from "../../edit/containers/Edit";
import SelectMachines from "../../selectmachines/containers/SelectMachines";

export enum ProductivityModules {
  edit = "edit",
  selectMachine = "selectMachine"
}

export const ModuleRoutes: Record<ProductivityModules, ModuleSelection> = {
  [ProductivityModules.edit]: { component: Edit, key: "edit" },
  [ProductivityModules.selectMachine]: { component: SelectMachines, key: "selectMachines" },
};
