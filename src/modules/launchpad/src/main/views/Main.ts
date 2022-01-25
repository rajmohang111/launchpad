import * as h from "react-hyperscript";
import { LaunchPadState } from "../reducers/launchpad";
import PageSelector, { PageSelectionActions } from "./pageselector";
import { Page } from "react-onsenui";

export type LaunchPadProps = {
  launchState: LaunchPadState,
  isLoggedIn: boolean,
  actions: PageSelectionActions
};

const Main = ({ launchState, actions, isLoggedIn }: LaunchPadProps) =>
  h(Page, [
    h(PageSelector, { actions, isLoggedIn })
  ]);


export default Main;
