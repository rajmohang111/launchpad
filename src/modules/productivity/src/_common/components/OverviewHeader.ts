import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import { Toolbar } from "react-onsenui";

import { colors, fonts } from "../../../../../_common/styles/global";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { productivityModuleName } from "../../../../../_common/i18n/message/translations";
import LaunchpadSwitch from "../../../../../_common/components/LaunchpadSwitch";

export type OverViewHeaderActionsProps = {
  actions: {
    onSwitcherChange: (displayMetersPerHour: boolean) => void,
  }
};

export type OverViewHeaderProps = OverViewHeaderActionsProps & {
  displayMetersPerHour: boolean,
};

const mainStyles = {
  container: css({
    display: "flex",
    flex: "1 1 100%",
    flexDirection: "column",
    justifyContent: "space-between",
    lineHeight: "56px",
    height: "100%",
  }),
  toolbar: css({
    "> ons-toolbar": css({
      height: "95px",
      "> .toolbar__title": css({
        marginRight: "0px",
        marginLeft: "0px",
      })
    }),
  }),
  pageTitle: css({
    textAlign: "center"
  }),
  listheader: css({
    display: "flex",
    flex: "1 1 100%",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.whiteSmoke,
    color: colors.atomic,
    height: "39px"
  }),
  col1: css({
    display: "flex",
    flex: "1 1 25%",
    justifyContent: "center",
    alignItems: "center",
    "& span": fonts.listHeader
  }),
  col2: css({
    display: "flex",
    flex: "1 1 50%",
    justifyContent: "center",
    alignItems: "center",
    "& span": fonts.listHeader
  }),
  col3: css({
    display: "flex",
    flex: "1 1 25%",
    justifyContent: "center",
    alignItems: "center",
    "& span": fonts.listHeader
  }),
  switcherLabel: css({
    paddingRight: "7px",
    paddingLeft: "7px",
  }),
};

const OverviewHeader = ({ displayMetersPerHour, actions }: OverViewHeaderProps) =>
  h("div", { className: mainStyles.toolbar }, [
    h(Toolbar, [
      h("div", { className: cx("center", mainStyles.container) }, [
        h("div", { className: mainStyles.pageTitle }, [
          h(FormattedMessage, { id: productivityModuleName, defaultMessage: "Productivity" })
        ]),
        h("div", { className: mainStyles.listheader }, [
          h("div", { className: mainStyles.col1 }, [
            h(FormattedMessage, { id: "productivity_machine", defaultMessage: "Machine" })
          ]),
          h("div", { className: mainStyles.col2 }, [
            h("label", { className: mainStyles.switcherLabel }, [
              h(FormattedMessage, { id: "productivity_rpm", defaultMessage: "rpm" })
            ]),
            h(LaunchpadSwitch, {
              checked: displayMetersPerHour,
              onChange: actions.onSwitcherChange
            }),
            h("label", { className: mainStyles.switcherLabel }, [
              h(FormattedMessage, { id: "productivity_metersPerHour", defaultMessage: "m/h" })
            ])
          ]),
          h("div", { className: mainStyles.col3 }, [
            h(FormattedMessage, { id: "productivity_perform", defaultMessage: "perform" })
          ]),
        ])
      ])
    ])
  ]);


export default OverviewHeader;
