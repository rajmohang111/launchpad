import * as React from "react";
import { ReactElement } from "react";
import * as PropTypes from "prop-types";
import { FormatMessage } from "../format_message";

export type InjectedI18NProps = {
  intl: {
    formatMessage: FormatMessage
  }
};

type RenderFunction = (props: InjectedI18NProps) => ReactElement<any>;
export type I18NProps = {
  component: RenderFunction;
};


export class I18N extends React.Component<I18NProps> {


  static contextTypes = {
    intl: PropTypes.object
  };

  render() {

    return this.props.component({ intl: { formatMessage: this.context.intl.formatMessage } });

  }

}
