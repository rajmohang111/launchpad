import { AppModule } from "../../../models/module";

export const isAppModuleSelected = (appModule: AppModule, selectedAppModule: AppModule | null) =>
  appModule && appModule === selectedAppModule;
