import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { List, ListItem } from "react-onsenui";
import { productivityModuleName, settingsModuleName } from "../../../../../_common/i18n/message/translations";
import { AppModule } from "../../../../../_common/models/module";
import { colors, background } from "../../../../../_common/styles/global";
import Ionicon from "react-ionicons";

export type PageSelectionActions = {
  onModuleSelectAction: (selectedModule: AppModule, redirectModule?: AppModule) => void;
};

export type PageSelectorProps = {
  isLoggedIn: boolean,
  actions: PageSelectionActions
};

const mainStyles = {
  thumbnail: css({
    width: "23px",
    height: "23px",
    padding: "8.5px"

  }),
  loggedIn: css({
    background: colors.atomic,
    color: colors.white,
  }),
  loggedOut: css({
    background: colors.darkGray,
    color: colors.atomic,
  }),
  launchpad: css({
    position: "absolute",
    bottom: "0px",
    width: "100%",
    background: colors.white75,
  }),
  disabled: css({
    color: colors.darkGray,
  }),
  content: css({
    height: "100%",
    background: colors.white,
  }),
  page: css({
    height: "100%",
    background : background.mainGradient
  }),
  headingContent: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "84px"
  }),
  bitmap: css({
    width: "79.5%",
  }),
  superLargeTopSpace: css({
    marginTop: "42px"
  }),
  mediumTopSpace: css({
    marginTop: "22px"
  }),
};

const PageSelector = ({ actions, isLoggedIn }: PageSelectorProps) =>

  h("div", { className: mainStyles.content }, [
    h("div", { className: mainStyles.page }, [
      h("div", { className: mainStyles.headingContent }, [
        h("img", { className: mainStyles.bitmap, src: "static/images/KM_ON_Logo_without_Claim_colour_sRGB.svg"}),
      ]),
      h(List, { className: mainStyles.launchpad
      }, [
        isLoggedIn ?
          h(ListItem, {
            tappable: true,
            onClick: () => actions.onModuleSelectAction(AppModule.productivity),
            modifier: "longdivider"
          }, [
            h("div", {className: "list-item__left list-item--longdivider__left"},
              [h("div", {className: cx(mainStyles.thumbnail, mainStyles.loggedIn, "list-item__thumbnail list-item--material__thumbnail")},
                [h(Ionicon, {icon: "md-stats", fontSize: "22px", color: colors.white})]),
              ]),
            h("div", {className: "center list-item--longdivider__center"},
              [h(FormattedMessage, { id: productivityModuleName })]),
            h("div", {className: cx(mainStyles.disabled, "list-item__right list-item--longdivider__right")},
              [h(Ionicon, {icon: "md-log-in", fontSize: "21px", color: colors.darkGray})]),
          ]):
          h(ListItem, {
            tappable: true,
            onClick: () => actions.onModuleSelectAction(AppModule.productivity),
            modifier: "longdivider"
          }, [
            h("div", {className: "list-item__left list-item--longdivider__left"},
              [h("div", {className: cx(mainStyles.thumbnail, mainStyles.loggedOut, "list-item__thumbnail list-item--material__thumbnail")},
                [h(Ionicon, {icon: "md-stats", fontSize: "22px", color: colors.atomic})]),
              ]),
            h("div", {className: cx(mainStyles.disabled, "center list-item--longdivider__center")},
              [h(FormattedMessage, { id: productivityModuleName })]),
            h("div", {className: "list-item__right list-item--longdivider__right"},
              [h(Ionicon, {icon: "md-log-in", fontSize: "21px", color: colors.atomic})]),
          ]),
          h(ListItem, {
            tappable: true,
            onClick: () => actions.onModuleSelectAction(AppModule.settings),
            modifier: "longdivider"
          }, [
            h("div", {className: "list-item__left list-item--longdivider__left\""},
              [h("div", {className: cx(mainStyles.thumbnail, mainStyles.loggedIn, "list-item__thumbnail list-item--material__thumbnail")},
                [h(Ionicon, {icon: "md-settings", fontSize: "22px", color: colors.white})]),
              ]),
            h("div", {className: "center"},
              [h(FormattedMessage, { id: settingsModuleName })]),
          ])
      ]),
    ]),
  ]);

export default PageSelector;
