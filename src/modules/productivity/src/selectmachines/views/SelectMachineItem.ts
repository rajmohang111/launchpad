import * as h from "react-hyperscript";
import { css } from "emotion";
import { ListItem } from "react-onsenui";
import { UpdateMachineSelectionAction } from "../actions/selectMachines_actions";
import { Device } from "../../_common/models/device";
import { colors, margins } from "../../../../../_common/styles/global";
import LaunchpadCheckbox from "../../../../../_common/components/LaunchpadCheckbox";

export type SelectMachinesItemActions = {
  onSelect: (selectStatus: boolean, gid: number) => UpdateMachineSelectionAction;
};

export type SelectMachinesItemProps = {
  index: number;
  device: Device;
  deviceIds: Array<number>
  actions: SelectMachinesItemActions
};

const selectMachinesItemStyles = {
  separator: css({
    color: colors.veryLightGrey,
    marginLeft: margins.medium.left,
    marginRight: margins.medium.right
  })
};

const mainStyles = {
  deviceName: css({
    color: colors.disabledGrey
  })
};

const SelectMachinesItem = ({ index, actions, deviceIds, device }: SelectMachinesItemProps) =>
  h(ListItem, { className: "longdivider" }, [
    h("label", { className: "left" }, [
      h(LaunchpadCheckbox, {
        id: `selectMachine-checkbox-${index}`,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => actions.onSelect(event.target.checked, device.id),
        checked: deviceIds.some(id => id === device.id)
      })
    ]),
    h("label", { className: "center", htmlFor: `selectMachine-checkbox-${index}` }, [
      device.attributes.metaData ? h("span", [device.attributes.metaData.number]) : null,
      device.attributes.metaData && device.attributes.metaData.number ? h("span", { className: selectMachinesItemStyles.separator }, " | ") : null,
      device.attributes.metaData ? h("span", { className: mainStyles.deviceName }, [device.attributes.metaData.name]) : null
    ])
  ]);

export default SelectMachinesItem;
