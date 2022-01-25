import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import { colors } from "../../../../../_common/styles/global";
import { Device } from "../../_common/models/device";
import MachineInfoItem from "../../_common/components/MachineInfoItem";
import { get } from "lodash";
import PercentageDisplay from "../../_common/components/PercentageDisplay";
import { getCalculatedValuesForDevice } from "../../overview/services/overview_services";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import Ionicon from "react-ionicons";
import { Row, Col } from "react-onsenui";
import MachineNameInfo from "../../_common/components/MachineInfoName";
import { determineColor } from "../services/details";

const styles = {
  portrait: {
    baseContainer: css({
      borderBottom: `1px solid ${colors.veryLightGrey}`,
      padding: "0 16.5px",
    }),
    headerText: css({
      fontSize: "18pt",
      fontWeight: 500,
      margin: "9.5px 0",
      padding: "0",
    }),
    headerLabel: css({
      margin: "0.8em 0",
      marginBottom: "11px",
      lineHeight: "23px",
    }),
    headerValue: css({
      fontSize: "20px",
      fontWeight: 500,
    }),
    spaceRight: css({
      marginRight: "8px"
    }),
    infoContainer: css({
      display: "flex",
      flex: "1 1 100%",
      justifyContent: "center",
      alignContent: "center",
      marginBottom: "16px",
    }),
    twoCols: css({
      width: "50%",
    }),
    alignRight: css({
      textAlign: "right",
    }),
    rotateDiv: css({
      verticalAlign: "middle",
      textAlign: "center",
      margin: "auto",
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      height: "29px",
      width: "100%",
      position: "relative"
    }),
    icon: css({
      lineHeight: "29px",
      display: "inline-block",
      verticalAlign: "middle",
    })
  }
};

type PortraitHeaderProps = {
  device: Device,
};
const PortraitHeader = ({ device }: PortraitHeaderProps) => {
  const calculatedValues = getCalculatedValuesForDevice(device);
  const warnings = get(device, "measurementWarnings", []);
  return h("div", [
    h(Row, { className: cx(styles.portrait.baseContainer, styles.portrait.rotateDiv) }, [
      h("div", { className: styles.portrait.rotateDiv }, [
        h(Ionicon, { className: cx(styles.portrait.icon, styles.portrait.spaceRight), icon: "ios-phone-landscape", fontSize: "22px", color: colors.atomic }),
        h("div", { className: styles.portrait.icon }, [
          h(FormattedMessage, { id: "productivity_details_rotate" })
        ])
      ]),
    ]),
    h(Row, { className: styles.portrait.baseContainer }, [
      h(MachineNameInfo, { name: get(device, "attributes.metaData.name", ""), headerTextClass: styles.portrait.headerText, headerLabelClass: styles.portrait.headerLabel }),
      h(Col, { className: styles.portrait.infoContainer }, [
        h(MachineInfoItem, {
          className: styles.portrait.twoCols,
          labelId: "productivity_details_mg",
          value: `${get(device, "attributes.metaData.code", "")}`
        }),
        h(MachineInfoItem, {
          className: cx(styles.portrait.twoCols, styles.portrait.alignRight),
          labelId: "productivity_details_number",
          value: `${get(device, "attributes.metaData.number", "")}`
        }),
      ]),
      h(Col, { className: styles.portrait.infoContainer }, [
        h(PercentageDisplay, {
          className: styles.portrait.twoCols,
          labelId: "productivity_details_perform",
          color: determineColor("PERFORMANCE_MEASUREMENT_OUTDATED", warnings, calculatedValues.currentPerformance, calculatedValues.targetPerformance),
          percentage: calculatedValues.currentPerformance
        }),
        h(PercentageDisplay, {
          className: cx(styles.portrait.twoCols, styles.portrait.alignRight),
          labelId: "productivity_details_avail",
          percentage: calculatedValues.currentAvailability,
          color: determineColor("AVAILABILITY_MEASUREMENT_OUTDATED", warnings, calculatedValues.currentAvailability),
        }),
      ])
    ])
  ]);
};

export default PortraitHeader;
