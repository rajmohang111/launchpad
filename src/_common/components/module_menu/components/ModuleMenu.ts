import { ReactElement } from "react";
import * as h from "react-hyperscript";
import { css } from "emotion";
import ModuleMenuContainer from "./ModuleMenuContainer";

const styles = {
  menuWrapper: css({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
  }),
  content: css({
    flex: 1,
    overflow: "auto",
  }),
  footer: css({
    position: "relative"
  })
};

export type MenuProps = {
  component: () => ReactElement<any>;
};

const ModuleMenu = (props: MenuProps) =>
  h("div", {className: styles.menuWrapper}, [
    h("div", { className: styles.content }, [
      props.component()
    ]),
    h("footer", {className: styles.footer}, [
      h(ModuleMenuContainer)
    ])
  ]);

export default ModuleMenu;
