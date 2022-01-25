import * as h from "react-hyperscript";
import { css } from "emotion";

export type MenuBackdropProps = {
  actions: {
    onClick: () => void
  }
};

const styles = {
  backdrop: css({
    height: "100%",
    width: "100%",
    top: "0",
    bottom: "0",
    position: "fixed"
  })
};

const MenuBackdrop = (props: MenuBackdropProps) =>
  h("div", { className: styles.backdrop, onClick: props.actions.onClick });

export default MenuBackdrop;
