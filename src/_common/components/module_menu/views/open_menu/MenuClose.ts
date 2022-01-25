import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import Ionicon from "react-ionicons";
import { colors } from "../../../../styles/global";


const styles = {
  circle: css({
    borderRadius: "50%",
    borderStyle: "solid",
    borderWidth: "2px",
  }),
  closeContainer: css({
    position: "absolute",
    bottom: "3px",
    width: "100%"
  }),
  closeBottom: css({
    position: "relative",
    height: "43px",
    width: "43px",
    margin: "0 auto 0 auto",
    borderColor: colors.white,
    backgroundColor: colors.teal
  }),
  closeIcon: css({
    textAlign: "center",
    marginTop: "10.5px"
  })
};

export const MenuClose = () =>
  h("div", { className: styles.closeContainer }, [
    h("div", { className: cx(styles.circle, styles.closeBottom) }, [
      h("div", { className: styles.closeIcon }, [
        h(Ionicon, {icon: "md-close", fontSize: "22px", color: colors.white})
      ])
    ])
  ]);

export default MenuClose;
