import * as h from "react-hyperscript";
import { css } from "emotion";
import { NavigateWithResetAction } from "../../../../../../app/actions/routing";
import { AppModule } from "../../../../../models/module";
import ModuleItem from "./ModuleItem";
import ModuleItemLabel from "./ModuleItemLabel";

export type ModulesSelectionActions = {
  onHomeSelect: () => NavigateWithResetAction,
  onModuleSelect: (selectedAppModule: AppModule) => void
};
export type ModulesSelectionProps = {
  isLoggedIn: boolean,
  selectedModule: AppModule,
  actions: ModulesSelectionActions
};

const styles = {
  moduleSelection: css({
    margin: "0 auto 0 auto",
    paddingTop: "6.5px"
  }),
  icons: css({
    textAlign: "center",
    margin: "12px 0 12px 0"
  }),
  moduleSelectionAlignment: css({
    display: "flex",
    justifyContent: "space-between"
  }),
  moduleSelectionPart: css({
    width: "33%",
    alignContent: "center"
  })
};


const ModulesSelection = (props: ModulesSelectionProps) =>
  h("div", { className: styles.moduleSelection }, [
    h("div", { className: styles.moduleSelectionAlignment }, [
      h("div", { className: styles.moduleSelectionPart},[
        h(ModuleItem, { ...props, icon: "md-home", requiresLogin: false, appModule: AppModule.launchpad, actions: { onClick: props.actions.onHomeSelect }}),
      ]),
      h("div", { className: styles.moduleSelectionPart},[
        h(ModuleItem, { ...props, icon: "md-stats", requiresLogin: true, appModule: AppModule.productivity, actions: { onClick: () => props.actions.onModuleSelect(AppModule.productivity) }}),
      ]),
      h("div", { className: styles.moduleSelectionPart},[
        h(ModuleItem, { ...props, icon: "md-settings", requiresLogin: false, appModule: AppModule.settings, actions: { onClick: () => props.actions.onModuleSelect(AppModule.settings) }})
      ]),
    ]),
    h("div", { className: styles.moduleSelectionAlignment }, [
      h(ModuleItemLabel, { labelId: "module_menu_open_module_home_title", defaultMessage: "Home" }),
      h(ModuleItemLabel, { labelId: "module_menu_open_module_productivity_title", defaultMessage: "Productivity" }),
      h(ModuleItemLabel, { labelId: "module_menu_open_module_settings_title", defaultMessage: "Settings" })
    ])
  ]);

export default ModulesSelection;
