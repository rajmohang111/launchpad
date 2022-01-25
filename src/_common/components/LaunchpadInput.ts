import * as React from "react";
import * as h from "react-hyperscript";
import { css } from "emotion";

export type LaunchpadInputProps = {
  value: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLElement>) => void;
  name?: string;
  disabled?: boolean;
  type?: string;
  onBlur?: (e: React.FocusEvent<any>) => void;
};

const styles = {
  container: css({
    marginTop: "5px",
    width: "100%",
    "> .text-input": {
      width: "100%",
      display: "inline-block",
      WebkitTransform: "none"
    }
  })
};

const LaunchpadInput = (props: LaunchpadInputProps) =>
  h("div", { className: styles.container }, [
    h("input",
      {
        ...props,
        className: "text-input text-input--material"
      }),
    h("span", {
      className: "text-input__label text-input--material__label"
    })
  ]);

export default LaunchpadInput;
