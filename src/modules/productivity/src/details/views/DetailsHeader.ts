import { DEVICE_ORIENTATION } from "../../../../../_common/models/device_orientation";
import  { DetailsSwitchProps } from "./DetailsSwitch";
import { Device } from "../../_common/models/device";
import PortraitHeader from "./PortraitHeader";
import LandscapeHeader from "./LandscapeHeader";

export type DetailsHeaderProps = DetailsSwitchProps & {
  device: Device,
  orientation: DEVICE_ORIENTATION,
};

export const DetailsHeader = ({ device, displayMetersPerHour, orientation, actions }: DetailsHeaderProps) => {
  if (orientation === DEVICE_ORIENTATION.PORTRAIT) {
    return PortraitHeader({ device });
  }
  return LandscapeHeader({ device, displayMetersPerHour, actions });
};
export default DetailsHeader;
