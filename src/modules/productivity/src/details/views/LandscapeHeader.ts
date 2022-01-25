import * as h from "react-hyperscript";
import { css } from "emotion";
import { Device } from "../../_common/models/device";
import MachineInfoItem from "../../_common/components/MachineInfoItem";
import { get } from "lodash";
import DetailsSwitch, { DetailsSwitchProps } from "./DetailsSwitch";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { Row, Col } from "react-onsenui";

const styles = {
  landscape: {
    headerText: css({
      textAlign: "center",
      paddingTop: "3px",
      fontSize: "18pt",
      lineHeight: "24px",
      fontWeight: 500
    }),
    spaceRight: css({
      marginRight: "8px"
    }),
    percentage: css({
      width: "50%",
    }),
    headerLabel: css({
      margin: "0 0",
      lineHeight: "23px",
    }),
    headerValue: css({
      fontSize: "20px",
      fontWeight: 500,
    }),
    paddingTop: css({
      paddingTop: "10px"
    }),
    alignRight: css({
      textAlign: "right",
    })
  }
};

type MachineDisplayProps = {
  name: string;
};

const MachineNameDisplayLandscape = ({ name }: MachineDisplayProps) =>
  name.length > 8 ?
    h("div", { className: styles.landscape.headerText }, name)
    :
    h("div", { className: styles.landscape.headerLabel }, [
      h(FormattedMessage, { id: "productivity_details_name" }),
      h("span", { className: styles.landscape.spaceRight }, [":"]),
      h("span", { className: styles.landscape.headerValue }, [
        name
      ])
    ]);


type LandscapeHeaderProps = DetailsSwitchProps & {
  device: Device,
};

const LandscapeHeader = ({ device, displayMetersPerHour, actions }: LandscapeHeaderProps) => {
  return h("div", [
    h("div", { className: styles.landscape.headerText }, [
      h(MachineNameDisplayLandscape, { name: get(device, "attributes.metaData.name", "") })
    ]),
    h(Row, [
      h(Col, { width: "40%" }, [
        h(MachineInfoItem, {
          labelId: "productivity_details_mg",
          value: `${get(device, "attributes.metaData.code", "")}`
        }),
      ]),
      h(Col, { width: "20%", verticalAlign: "center" }, [
        h(DetailsSwitch, { displayMetersPerHour, actions })
      ]),
      h(Col, { width: "40%" }, [
        h(MachineInfoItem, {
          labelId: "productivity_details_number",
          value: `${get(device, "attributes.metaData.number", "")}`,
          className: styles.landscape.alignRight
        }),
      ])
    ])
  ]);
};

export default LandscapeHeader;
