import { AppModule } from "../../../../../models/module";
import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import Ionicon from "react-ionicons";
import { colors } from "../../../../../styles/global";
import { isAppModuleSelected } from "../../../services/module_menu";

export type ModuleItemProps = {
  appModule: AppModule,
  selectedModule: AppModule,
  icon: string,
  isLoggedIn: boolean,
  requiresLogin: boolean
  actions: {
    onClick: () => void
  }
};

const styles = {
  selectItemBorder: css({
    borderWidth: "2pt",
    borderStyle: "solid",
    borderRadius: "5px 5px 5px 5px"
  }),
  icons: css({
    textAlign: "center",
    margin: "12px 0 12px 0"
  }),
  selectedItem: css({
    borderColor: colors.teal
  }),
  item: css({
    margin: "auto",
    top: "0; left: 0; bottom: 0; right: 0",
    height: "53px",
    width: "53px",
    position: "relative"
  }),
  itemEnabled: css({
    borderColor: colors.white
  }),
  itemDisabled: css({
    position: "unset",
    borderColor: colors.disabledGrey,
  }),
  logInIcon: css({
    margin: "auto",
    left: "50px",
    bottom: "0",
    right: "0",
    height: "28px",
    width: "28px",
    display: "block",
    position: "absolute",
    top: "-95px",
    borderRadius: "50%",
    backgroundColor: colors.atomic,
  })
};

const isDisabled = (isLoggedIn: boolean, requiresLogin: boolean) => requiresLogin && !isLoggedIn;
const determineBorderColorWhenEnabled = (appModule: AppModule, selectedAppModule: AppModule | null) =>
  isAppModuleSelected(appModule, selectedAppModule) ?
    styles.selectedItem:
    styles.itemEnabled;
const createSelectionItemStyle = (isLoggedIn: boolean, requiresLogin: boolean, appModule: AppModule, selectedAppModule: AppModule | null) =>
  isDisabled(isLoggedIn, requiresLogin) ?
    cx(styles.item, styles.selectItemBorder, styles.itemDisabled):
    cx(styles.item, styles.selectItemBorder, determineBorderColorWhenEnabled(appModule, selectedAppModule));
const createSelectItemIconColor = (isLoggedIn: boolean, requiresLogin: boolean) =>
  isDisabled(isLoggedIn, requiresLogin) ?
    colors.disabledGrey:
    colors.white;

const ModuleItem = (props: ModuleItemProps) =>
  h("div", { className: createSelectionItemStyle(props.isLoggedIn, props.requiresLogin, props.appModule, props.selectedModule), onClick: props.actions.onClick }, [
    isDisabled(props.isLoggedIn, props.requiresLogin) ?
      h("div", {className: styles.logInIcon}, [
        h(Ionicon, {icon: "md-log-in", fontSize: "28px", color: colors.white})
      ]):
      null,
    h("div", {className: styles.icons }, [
      h(Ionicon, {icon: props.icon, fontSize: "28px", color: createSelectItemIconColor(props.isLoggedIn, false)})
    ])
  ]);

export default ModuleItem;
