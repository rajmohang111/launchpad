import * as h from "react-hyperscript";
import Ionicon from "react-ionicons";
import { colors } from "../../../styles/global";
import { css, cx } from "emotion";
import { AppModule } from "../../../models/module";
import { isAppModuleSelected } from "../services/module_menu";

export type CollapsedMenuActions = {
  onMenuOpen: () => void,
  onHomeSelect: () => void,
  onModuleSelect: (selectedAppModule: AppModule) => void
};
export type CollapsedMenuProps = {
  selectedModule: AppModule | null,
  actions: CollapsedMenuActions
};

const stylesCircle = {
  borderRadius: "50%",
  borderStyle: "solid",
  borderWidth: "2px",
};

const styles = {
  backgroundDiv: css({
    backgroundColor: colors.atomic,
    height: "34.5px",
    position: "relative",
    bottom: "0",
    width: "100%",
    zIndex: 998,
  }),
  buttonOuterDiv: css({
    width: "50%",
    left: "50%",
    position: "absolute",
    bottom: "5px",
    zIndex: 999
  }),
  buttonInnerDiv: css({
    left: "-50%",
    marginRight: "auto",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 1000
  }),
  menuButton: css({
    ...stylesCircle,
    backgroundColor: colors.teal,
    height: "43px",
    width: "43px",
    borderColor: colors.white,
  }),
  moduleSelectedButton: css({
    borderColor: colors.teal
  }),
  notSelectedButton: css({
    borderColor: colors.white
  }),
  otherButtons: css({
    ...stylesCircle,
    marginTop: "4px",
    height: "35px",
    width: "35px",
    borderColor: colors.white,
    backgroundColor: colors.atomic
  }),
  homeIcon: css({
    margin: "10.5px 10.5px 10.5px 10.5px",
  }),
  otherIcons: css({
    margin: "8.5px 8.5px 8.5px 8.5px",
  })
};

const determineBorderColorStyle = (appModule: AppModule, selectedAppModule: AppModule | null) =>
  isAppModuleSelected(appModule, selectedAppModule) ?
    styles.moduleSelectedButton:
    styles.notSelectedButton;
const CollapsedMenu = (props: CollapsedMenuProps) =>
  h("div", [
    h("div", { className: styles.backgroundDiv }),
    h("div", { className: styles.buttonOuterDiv }, [
      h("div", { className: styles.buttonInnerDiv }, [
        h("div", { className: styles.otherButtons, onClick: props.actions.onHomeSelect }, [
          h("div", { className: styles.otherIcons }, [
            h(Ionicon, {icon: "md-home", fontSize: "18px", color: colors.white})
          ])
        ]),
        h("div", { className: cx(styles.menuButton, styles.notSelectedButton), onClick: props.actions.onMenuOpen }, [
          h("div", { className: styles.homeIcon }, [
            h(Ionicon, {icon: "md-menu", fontSize: "22px", color: colors.white})
          ])
        ]),
        h("div", { className: cx(styles.otherButtons, determineBorderColorStyle(AppModule.settings, props.selectedModule)), onClick: () => props.actions.onModuleSelect(AppModule.settings) }, [
          h("div", { className: styles.otherIcons }, [
            h(Ionicon, {icon: "md-settings", fontSize: "18px", color: colors.white})
          ])
        ])
      ])
    ])
  ]);

export default CollapsedMenu;
