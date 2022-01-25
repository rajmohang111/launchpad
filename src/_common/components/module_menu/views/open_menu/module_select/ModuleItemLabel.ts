import * as h from "react-hyperscript";
import FormattedMessage from "../../../../../i18n/components/Formatted_Message";
import { css } from "emotion";
import { colors, fonts } from "../../../../../styles/global";

export type ModuleItemLabelProps = {
  labelId: string,
  defaultMessage: string
};

const styles = {
  moduleNameElement: css({
    ...fonts.moduleSelectLabel,
    color: colors.white,
    marginTop: "4px",
    textAlign: "center",
    width: "33%"
  })
};

const ModuleItemLabel = (props: ModuleItemLabelProps) =>
  h("div", { className: styles.moduleNameElement }, [
    h(FormattedMessage, { id: props.labelId, defaultMessage: props.defaultMessage })
  ]);

export default ModuleItemLabel;
