import * as h from "react-hyperscript";
import {css, cx} from "emotion";
import {CSSWideKeyword} from "react";
import {colors} from "../../../../../_common/styles/global";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";

export type PercentageDisplayProps = {
  className: string,
  labelId: string,
  percentage: number,
  color: string,
};

const styles = {
  container: css({
    display: "flex",
    flex: "1 1 100%",
    flexDirection: "column",
    justifyContent: "center",
  }),
  label: css({
    fontSize: "13pt",
    fontWeight: "500" as CSSWideKeyword,
    color: colors.atomic,
    lineHeight:"13px"
  }),
  percentage: css({
    fontSize: "35pt",
    fontWeight: "bold"
  }),
};

export const PercentageDisplay = (props: PercentageDisplayProps) => {
  const {className, labelId, percentage, color = colors.teal} = props;
  return h("div", {className: cx(styles.container, className)}, [
    h("label", {className: styles.label}, [
      h(FormattedMessage, {id: labelId})
    ]),
    h("label", {className: styles.percentage, style: {color: `${color}`}}, `${percentage}%`)
  ]);
};
export default PercentageDisplay;
