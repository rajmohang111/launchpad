import * as h from "react-hyperscript";
import { css } from "emotion";

import {colors, fonts} from "../../../../../_common/styles/global";
import { MetadataAttributes } from "../../_common/models/device";
import MachineInfoItem from "../../_common/components/MachineInfoItem";
import {Col, Row} from "react-onsenui";
import  MachineNameInfo from "../../_common/components/MachineInfoName";

export type MachineInfoProps = {
  metadata: MetadataAttributes
};

const mainStyles = {
  mainTitle: css({
    color: colors.atomic,
    "& span": fonts.moduleTitle
  }),
  input: css({
    marginTop: "4px",
    width: "100%",
  }),
  itemDiv: css({
    padding: "0px 16.5px 16.5px 16.5px",
    backgroundColor: "white"
  }),
  alignRight: css({
    textAlign: "right",
  }),
  headerText: css({
    fontSize: "18pt",
    fontWeight: 500,
    paddingTop: "5px"
  }),
  headerLabel: css({
    marginBottom: "11px",
    lineHeight: "23px",
    paddingTop: "5px"
  }),
  headerValue: css({
    fontSize: "20px",
    fontWeight: 500
  }),
  spaceRight: css({
    marginRight: "8px"
  }),
};


const MachineInfo = ({ metadata }: MachineInfoProps) =>
  h("div", { className: mainStyles.itemDiv }, [
    h(MachineNameInfo, { name:  metadata.name , headerTextClass: mainStyles.headerText , headerLabelClass: mainStyles.headerLabel }),
    h(Row, { className: mainStyles.input }, [
      h(Col, { width: "50%" }, [
        h(MachineInfoItem, { labelId: "edit_machineGroup", value: metadata.code }),
      ]),
      h(Col, { className: mainStyles.alignRight, width: "50%" }, [
        h(MachineInfoItem, { labelId: "edit_kmNumber", value: metadata.number })
      ]),
    ]),
  ]);

export default MachineInfo;
