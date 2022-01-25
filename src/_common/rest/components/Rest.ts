import * as React from "react";
import { ReactElement } from "react";
import { RestContext } from "./RestProvider";
import * as PropTypes from "prop-types";

export type PassedRestProps = Required<RestContext>;

type RenderFunction = (props: PassedRestProps) => ReactElement<any>;
export type RestProps = {
  component: RenderFunction,
};

export class Rest extends React.Component<RestProps> {

  static contextTypes = {
    restServices: PropTypes.object,
    credential: PropTypes.object
  };

  render() {
    return this.props.component(this.context);
  }

}
