import * as h from "react-hyperscript";
import * as React from "react";
import { Page, List } from "react-onsenui";

import { completeToolbarCreator, createToolbarNavigationElement } from "../../../../../_common/toolbar/factory";
import { productivityselectMachinesModuleName, cancelButtonName } from "../../../../../_common/i18n/message/translations";
import { Device } from "../../_common/models/device";
import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import SearchBox from "./SearchBox";
import { I18NContext } from "../../../../../_common/i18n/IntlProvider";
import { I18N } from "../../../../../_common/i18n/components/I18N";
import { filterDeviceList } from "../services/selectmachines_services";
import { UpdateMachineSelectionAction } from "../actions/selectMachines_actions";
import SelectMachinesItem from "./SelectMachineItem";

export type ProductivitySelectMachinesActions = ToolbarActions & {
  onSave: () => void;
  onSearch: (searchText: string) => void;
  onSelect: (selectStatus: boolean, gid: number) => UpdateMachineSelectionAction;
  onUpdateSearchParams: (searchParam: string) => void,
};

export type ProductivitySelectMachinesProps = {
  deviceList: Array<Device>,
  deviceIds: Array<number>,
  searchParam: string,
  actions: ProductivitySelectMachinesActions
};

// mgruel: left the styles in because i can't recall why they haven't been in use.
// const selectMachinesViewStyles = {
//   searchBar: css({
//     backgroundColor: colors.veryLightGrey,
//   }),
//   number: css({
//     ...fonts.listHeader,
//     color: colors.darkGray
//   }),
//   name: css({
//     ...fonts.listHeader,
//     color: colors.veryLightGrey
//   }),
//   separator: css({
//     color: colors.veryLightGrey,
//     marginLeft: margins.medium.left,
//     marginRight: margins.medium.right
//   })
// };


const renderRow = (deviceIds: Array<number>, actions: ProductivitySelectMachinesActions) => (row: Device, index: number) =>
  React.createElement(SelectMachinesItem, { device: row, index, deviceIds, actions, key: row.id });

const SelectMachinesView = ({ deviceIds, searchParam, deviceList, actions }: ProductivitySelectMachinesProps) =>
  h(Page, {
    renderToolbar: completeToolbarCreator(
      productivityselectMachinesModuleName,
      createToolbarNavigationElement(actions.onNavigateBack, cancelButtonName),
      createToolbarNavigationElement(actions.onSave, "selectMachines_select"),
    )
  }, [
      h(I18N, {
        component: (i18N: I18NContext) =>
          h(SearchBox, { searchParam, actions, placeholder: i18N.intl.formatMessage("selectMachines_searchExistingMachine") })
      }),
      h(List, {
        dataSource: filterDeviceList(deviceList, searchParam),
        renderRow: renderRow(deviceIds, actions)
      })
    ]);

export default SelectMachinesView;
