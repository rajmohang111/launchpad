import { LoginAction } from "../../modules/login/src/Login/actions/login";
import { AccountAction } from "../../modules/settings/src/account/actions/account";
import { RegistrationAction } from "../../modules/registration/src/main/actions/registration";
import { AppAction } from "./bootstrap";

export type SystemAction =
  LoginAction |
  AccountAction |
  AppAction |
  RegistrationAction;
