import * as React from "react";
import Productivity from "../../modules/productivity/src/main/containers/Productivity";
import Settings from "../../modules/settings/src/main/containers/Main";
import Tutorial from "../../modules/tutorials/src/main/containers/Main";
import Launchpad from "../../modules/launchpad/src/main/containers/Main";
import Registration from "../../modules/registration/src/main/containers/Registration";
import Login from "../../modules/login/src/Login/containers/Login";

export enum AppModule {
  launchpad = "launchpad",
  tutorial = "tutorial",
  settings = "settings",
  productivity = "productivity",
  registration = "registration",
  login = "login"
}

export type ModuleSelection = {
  component: React.ComponentType,
  key: string,
  requiresLogin?: boolean,
  props?: Record<string, string>
};

export const AppModuleRoutes: Record<AppModule, ModuleSelection> = {
  [AppModule.launchpad]: { component: Launchpad, key: AppModule.launchpad },
  [AppModule.productivity]: { component: Productivity, key: AppModule.productivity, requiresLogin: true },
  [AppModule.settings]: { component: Settings, key: AppModule.settings },
  [AppModule.tutorial]: { component: Tutorial, key: AppModule.tutorial },
  [AppModule.registration]: { component: Registration, key: AppModule.registration },
  [AppModule.login]: { component: Login, key: AppModule.login }
};

export const createModuleSelection = (appModule: AppModule) => AppModuleRoutes[appModule];

export const createModuleSelectionWithProps = (appModule: AppModule, props: Record<string, string>): ModuleSelection => ({
  ...createModuleSelection(appModule),
  props: {
    ...props
  }
});

export const createModuleSelectionWithRedirect = (appModule: AppModule, redirectModule: AppModule): ModuleSelection =>
  createModuleSelectionWithProps(appModule, { redirectModule });
