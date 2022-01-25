import * as React from "react";
import * as h from "react-hyperscript";
import CollapsedMenu from "../CollapsedMenu";
import OpenMenu from "./OpenMenu";
import { AppModule } from "../../../../models/module";

export type ModuleMenuViewProps = {
  isLoggedIn: boolean,
  selectedModule: AppModule | null,
  actions: {
    onHomeSelect: () => void,
    onModuleSelect: (selectedAppModule: AppModule) => void
  }
};

export type ModuleMenuViewState = {
  isOpen: boolean
};

class ModuleMenuView extends React.Component<ModuleMenuViewProps, ModuleMenuViewState> {

  constructor(props: ModuleMenuViewProps) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleOpen() {
    this.setState((previousState: ModuleMenuViewState) => ({
      isOpen: !previousState.isOpen
    }));
  }


  render() {
    return h("div", [
      h(CollapsedMenu, { selectedModule: this.props.selectedModule, actions: { onMenuOpen: this.toggleOpen.bind(this), ...this.props.actions } }),
      h(OpenMenu, { selectedModule: this.props.selectedModule, isOpen: this.state.isOpen, isLoggedIn: this.props.isLoggedIn, actions: { closeMenu: this.toggleOpen.bind(this), ...this.props.actions } })
    ]);
  }

}

export default ModuleMenuView;
