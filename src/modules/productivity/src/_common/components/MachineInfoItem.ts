import * as h from "react-hyperscript";
import {css, cx} from "emotion";

import {colors, fonts} from "../../../../../_common/styles/global";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";

export type MachineInfoItemProps = {
  labelId: string,
  value: string,
  className?: string,
};

const mainStyles = {
  container: css({
    display: "flex",
    flex: "1 1 100%",
    flexDirection: "column",
  }),
  fieldLabel: css({
    color: colors.disabledGrey,
    "& span": fonts.fieldLabel
  }),
  fieldValue: css({
    color: colors.atomic,
    "& span": fonts.fieldValue
  })
};

const MachineInfoItem = ({labelId, value, className}: MachineInfoItemProps) =>
  h("div", {className: cx(mainStyles.container, className)}, [
    h("label", {className: mainStyles.fieldLabel}, [
      h(FormattedMessage, {id: labelId})
    ]),
    h("label", {className: mainStyles.fieldValue}, value)
  ]);

export default MachineInfoItem;
