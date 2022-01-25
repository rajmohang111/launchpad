import { Component } from "react";
import * as h from "react-hyperscript";
import { Icon, PullHook, PullHookChangeEvent } from "react-onsenui";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";

export {PullHookChangeEvent} from "react-onsenui";

export type CustomPullHookProps = {
  onLoad?: (done: () => void) => void,
  onChange?: (event: PullHookChangeEvent) => void,
};

type CustomPullHookState = {
  pullHookState: "initial" | "preaction" | "action"
};

export class CustomPullHook extends Component<CustomPullHookProps, CustomPullHookState> {

  constructor(props: CustomPullHookProps) {
    super(props);

    this.state = {
      pullHookState: "initial"
    };

    this._onChange = this._onChange.bind(this);
    this._onLoad = this._onLoad.bind(this);
  }

  _onChange(event: PullHookChangeEvent) {
    const {onChange} = this.props;
    if (typeof onChange === "function") {
      onChange(event);
    }
    this.setState({ pullHookState: event.state });
  }

  _onLoad(done: () => void) {
    const {onLoad} = this.props;
    if (typeof onLoad === "function") {
      onLoad(done);
    }
  }

  render() {
    return h(PullHook, { onLoad: this._onLoad, onChange: this._onChange, fixedContent: false, thresholdHeight: 300 }, [
      (this.state.pullHookState === "initial") ?
        h("span", [
          h(Icon, { size: 35, spin: false, icon: "ion-arrow-down-c" }),
          h("span", "  "),
          h(FormattedMessage, { id: "pullToRefresh", defaultMessage: "Pull down to refresh" })
        ]) :
        (this.state.pullHookState === "preaction") ?
          h("span", [
            h(Icon, { size: 35, spin: false, icon: "ion-arrow-up-c" }),
            h("span", "  "),
            h(FormattedMessage, { id: "releaseToRefresh", defaultMessage: "Release to refresh" })
          ]) :
          null
    ]);
  }
}

export default CustomPullHook;
