import * as h from "react-hyperscript";
import { css } from "emotion";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { colors, fonts, margins } from "../../../../../_common/styles/global";
import { Icon, Page } from "react-onsenui";

export type CheckPartsProps = {
  moduleNameId: string;
};

const mainStyles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "90vh"
  }),
  headingContent: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textTransform: "uppercase",
    marginTop: margins.large.top
  }),
  heading: css({
    color: colors.teal,
    textAlign: "center",
    "& span": fonts.mainTitle
  }),
  information: css({
    color: colors.atomic95,
    "& span": fonts.moduleTitle
  }),
  bitmap: css({
    width: "115px",
    height: "100px",
  }),
  moduleTitle: css({
    color: colors.veryLightGrey,
    textTransform: "uppercase",
    borderTop: `2px solid ${colors.veryLightGrey}`,
    borderBottom: `2px solid ${colors.veryLightGrey}`,
    "& span": fonts.moduleTitle,
    minHeight: "40px",
    fontSize: "30px",
    verticalAlign: "middle"
  }),
  qrCode: css({
    marginBottom: margins.medium.bottom
  })
};

const Main = () =>
  h(Page, [
    h("div", { className: mainStyles.container }, [
      h("div", { className: mainStyles.headingContent }, [
        h("img", { className: mainStyles.bitmap }),
        h("label", { className: mainStyles.heading }, [
          h(FormattedMessage, { id: "karlMayer" })
        ]),
        h("label", { className: mainStyles.information }, [
          h(FormattedMessage, { id: "checkPartsInfo" })
        ]),
      ]),
      h("div", { className: mainStyles.moduleTitle }, [
        h(FormattedMessage, { id: "checkParts" })
      ]),
      h("div", { className: mainStyles.qrCode }, [
        h(Icon, { icon: "fa-qrcode", size: 100 }),
        h("div", [
          h(FormattedMessage, { id: "scanToVerify" })
        ])
      ]),
    ])
  ]);



export default Main;
