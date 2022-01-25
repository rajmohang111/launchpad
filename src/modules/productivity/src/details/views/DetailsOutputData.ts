import {css, cx} from "emotion";
import {Device} from "../../_common/models/device";
import * as h from "react-hyperscript";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import {getBarComponentHelper} from "../../_common/components/Bar";
import { DEVICE_ORIENTATION } from "../../../../../_common/models/device_orientation";
const styles = {
  mainContainer: css({
    display: "flex",
    flex: "1 1 100%",
    flexDirection: "column",
    justifyContent: "space-around",
  }),
  potraitLabel: css({
    display: "inline-block",
    margin: "8px 0",
  }),
  landscapeLabel: css({
    display: "inline-block",
    paddingBottom:"7px",
    lineHeight:"15px"
  })
};

export type DetailsOutputDataProps = {
  className?: string,
  device: Device,
  orientation:DEVICE_ORIENTATION
};

export const DetailsOutputData = ({device, className ,orientation}: DetailsOutputDataProps) => {
  const isPotrait =(orientation === DEVICE_ORIENTATION.PORTRAIT) ? true:false;
  const labelClass= isPotrait ? styles.potraitLabel:styles.landscapeLabel;
  return h("div", {className: cx(styles.mainContainer, className)}, [
    h("label", {className: labelClass}, [
      h(FormattedMessage, {id: "productivity_details_speed"})
    ]),
    getBarComponentHelper({device, displayMetersPerHour: false}),
    h("label", {className: labelClass}, [
      h(FormattedMessage, {id: "productivity_details_output"})
    ]),
    getBarComponentHelper({device, displayMetersPerHour: true }),
  ]);
};
export default DetailsOutputData;
