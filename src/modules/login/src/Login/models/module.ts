import { ModuleSelection } from "../../../../../_common/models/module";
import ResetPassword from "../../reset_password/containers/reset_password";

export enum LoginNavigationModule {
  RESET_PASSWORD = "RESETPASSWORD"
}

export const LoginNavigationModuleRoutes: Record<LoginNavigationModule, ModuleSelection> = {
  [LoginNavigationModule.RESET_PASSWORD]: { component: ResetPassword, key: "resetpassword" }
};

export const createLoginModuleSelection = (LoginModule: LoginNavigationModule): ModuleSelection => LoginNavigationModuleRoutes[LoginModule];
