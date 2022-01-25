import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import { colors } from "../../../../styles/global";
import ModulesSelection, { ModulesSelectionActions } from "./module_select/ModulesSelection";
import ModuleTitle from "./ModuleTitle";
import MenuClose from "./MenuClose";
import MenuBackdrop from "./MenuBackdrop";
import { AppModule } from "../../../../models/module";

export type OpenMenuActions = ModulesSelectionActions & {
  closeMenu: () => void;
};
export type OpenMenuProps = {
  isLoggedIn: boolean,
  isOpen: boolean,
  selectedModule: AppModule,
  actions: OpenMenuActions & ModulesSelectionActions
};

const styles = {
  menuBorder: css({
    borderTop: `3px solid ${colors.teal}`
  }),
  mainMenu: css({
    boxSizing: "border-box",
    height: "194px",
    width: "100%",
    backgroundColor: colors.atomic,
    opacity: 0.95,
    position: "absolute",
    bottom: "-200px",
    transition: "bottom 0.4s ease-out",
    zIndex: 1001
  }),
  open: css({
    bottom: "0"
  })
};

const createMenuStyles = (isOpen: boolean) => isOpen ? cx(styles.mainMenu, styles.open, styles.menuBorder) : cx(styles.mainMenu, styles.menuBorder);
const OpenMenu = (props: OpenMenuProps) => {
  return h("div", [
    props.isOpen ? h(MenuBackdrop, { actions: { onClick: props.actions.closeMenu } }) : null,
    h("div", { className: createMenuStyles(props.isOpen), onClick: props.actions.closeMenu }, [
      h(ModuleTitle),
      h(ModulesSelection, { selectedModule: props.selectedModule, actions: props.actions, isLoggedIn: props.isLoggedIn }),
      h(MenuClose)
    ])
  ]);
};

export default OpenMenu;
