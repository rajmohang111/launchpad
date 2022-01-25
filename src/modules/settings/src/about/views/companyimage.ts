import * as h from "react-hyperscript";
import { css } from "emotion";
import { Icon } from "react-onsenui";

import { colors, margins } from "../../../../../_common/styles/global";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";

const mainStyles = {
  bottomBar: css({
    bottom: "0",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: margins.medium.bottom
  }),
  mainTitle: css({
    color: colors.teal,
    textTransform: "uppercase"
  }),
  infoTitle: css({
    color: colors.atomic
  }),
  subTitle: css({
    marginLeft: margins.small.left,
    marginRight: margins.small.right,
  }),
  imageContainer: css({
    marginTop: margins.small.top
  }),
  bitmap: css({
    width: "79.5%",
  })
};

const CompanyImage = () => h("div", { className: mainStyles.bottomBar }, [
  h("div", { className: mainStyles.infoTitle }, [
    h(Icon, { icon: "minus" }),
    h("label", { className: mainStyles.subTitle }, [
      h(FormattedMessage, { id: "about_poweredBy" })
    ]),
    h(Icon, { icon: "minus" })
  ]),
  h("div", { className: mainStyles.imageContainer }, [
    h("img", { className: mainStyles.bitmap, src: "static/images/KM_ON_Logo_without_Claim_colour_sRGB.svg" }),
  ])
]);

export default CompanyImage;
