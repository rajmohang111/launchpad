import * as h from "react-hyperscript";
import { css } from "emotion";
import { colors, fonts } from "../../../../styles/global";
import FormattedMessage from "../../../../i18n/components/Formatted_Message";

const styles = {
  moduleTitle: css({
    ...fonts.buttonLabel,
    padding: "12px 0 6.5px 0",
    textAlign: "center",
    color: colors.white
  })
};

const ModuleTitle = () =>
  h("div", { className: styles.moduleTitle }, [
    h(FormattedMessage, { id: "module_menu_open_title", defaultMessage: "App Modules" })
  ]);

export default ModuleTitle;
