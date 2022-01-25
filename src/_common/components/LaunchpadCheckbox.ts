import * as React from "react";
import * as h from "react-hyperscript";

export type LaunchpadCheckboxProps = {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLElement>) => void;
};

const LaunchpadCheckbox = (props: LaunchpadCheckboxProps) =>
  h("div", { className: "checkbox checkbox--material" }, [
    h("input",
      {
        ...props,
        type: "checkbox",
        className: "checkbox__input checkbox--material__input"
      }),
    h("span", {
      className: "checkbox__checkmark checkbox--material__checkmark"
    })
  ]);

export default LaunchpadCheckbox;
