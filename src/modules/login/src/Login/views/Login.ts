import * as React from "react";
import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import { InjectedFormikProps, withFormik } from "formik";
import * as Yup from "yup";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { Page, Row, Icon } from "react-onsenui";
import FormErrorMessages from "../../../../../_common/components/FormErrorMessages";
import { AppModule } from "../../../../../_common/models/module";
import { SharedAccountRestService } from "../../../../../_common/rest/models/settings";
import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import { SharedAccountDeviceStore } from "../../../../../_common/stores/settings";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { LoginAction } from "../actions/login";
import { LoginState } from "../reducers/login";
import PendingButton from "../../../../../_common/components/PendingButton";
import { Credential } from "../../../../../_common/rest/models/rest";
import RegionSelector, { isProduction } from "../../../../../_common/components/RegionSelector";
import { getRegionFrom, Region } from "../../../../../_common/models/system";
import { background, colors } from "../../../../../_common/styles/global";
import LaunchpadInput from "../../../../../_common/components/LaunchpadInput";

export type LoginViewActions = ToolbarActions & {
  onLogin: (
    credential: Credential,
    accountRestService: SharedAccountRestService,
    accountDeviceStore: SharedAccountDeviceStore,
    appModule: AppModule)
    => ThunkAction<void, RootState, void, LoginAction>;
  onRegionChange: (region: Region, accountDeviceStore: SharedAccountDeviceStore) => void;
  onAccountRegister: () => void;
  onResetPassword: () => void;
};
export type LoginProps = {
  loginState: LoginState,
  redirectModule: AppModule,
  accountRestService: SharedAccountRestService,
  accountDeviceStore: SharedAccountDeviceStore,
  actions: LoginViewActions
};

const loginStyles = {
  headingContent: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px"
  }),
  bitmap: css({
    width: "79.5%",
  }),
  superLargeTopSpace: css({
    marginTop: "42px"
  }),
  largeTopSpace: css({
    marginTop: "32px"
  }),
  input: css({
    marginTop: "5px",
    width: "100%",
  }),
  label: css({
    paddingTop: "20px",
    display: "flex",
    justifyContent: "center"
  }),
  page: css({
    minHeight: "100%",
    background: background.mainGradient,
    padding: "30px"
  }),
  closebtn: css({
    textAlign: "center",
    fontSize: "20px",
    position: "absolute",
    color: colors.atomic,
    top: "35.2px",
    right: "33.2px"
  })
};

export type LoginViewState = {
  region: Region | undefined,
  username: string,
  password: string,
};

const LoginForm = (props: InjectedFormikProps<LoginProps, LoginViewState>) => {
  const {
    values,
    handleChange,
    handleSubmit,
    submitForm,
    errors,
    actions,
    loginState,
    handleBlur,
    touched
  } = props;
  const onRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(event);
    actions.onRegionChange(getRegionFrom(event.target.value), props.accountDeviceStore);
  };
  return h(Page, [
    h("div", { className: loginStyles.page }, [
      h("div", {
        className: loginStyles.closebtn,
        onClick: () => actions.onNavigateBack()
      }, [
          h(Icon, { icon: ("ion-close"), size: 24 })
        ]),
      h("form", { onSubmit: handleSubmit }, [
        h("div", [
          h("div", [
            h("div", { className: loginStyles.headingContent }, [
              h("img", {
                className: loginStyles.bitmap,
                src: "static/images/KM_ON_Logo_without_Claim_colour_sRGB.svg"
              }),
            ]),
            h("div", { className: loginStyles.superLargeTopSpace }, [
              h("span", [
                h(Row, { className: loginStyles.input }, [
                  h("label", [
                    h(FormattedMessage, { id: "region" })
                  ]),
                  h(RegionSelector, { value: values.region, actions: { onChange: onRegionChange }, isProduction }),
                  h(FormErrorMessages, {
                    error: errors.region,
                    messageId: errors.region,
                    touched: touched.region
                  })
                ]),
                h("div", { className: loginStyles.input }, [
                  h("label", [
                    h(FormattedMessage, { id: "login_username" })
                  ]),
                  h(LaunchpadInput, {
                    className: loginStyles.input,
                    onChange: handleChange,
                    name: "username",
                    type: "text",
                    value: values.username.trim(),
                    onBlur: handleBlur
                  }),
                  h(FormErrorMessages, {
                    error: errors.username,
                    messageId: errors.username,
                    touched: touched.username
                  }),
                ]),
                h("div", { className: loginStyles.input }, [
                  h("label", [
                    h(FormattedMessage, { id: "login_password" })
                  ]),
                  h(LaunchpadInput, {
                    className: loginStyles.input,
                    type: "password",
                    onChange: handleChange,
                    name: "password",
                    value: values.password,
                    onBlur: handleBlur
                  }),
                  h(FormErrorMessages, {
                    error: errors.password,
                    messageId: errors.password,
                    touched: touched.password
                  }),
                ]),
                h(PendingButton, {
                  modifier: "large--quiet",
                  ripple: true,
                  className: cx(loginStyles.largeTopSpace, "button"),
                  onClick: () => submitForm(),
                  requestPending: loginState.metadata.loginPending,
                  messageId: "login_login"
                }),
                h("div", { className: loginStyles.label }, [
                  h(FormattedMessage, { id: "login_forgot_password", onClick: () => actions.onResetPassword() })
                ]),
                h("div", { className: loginStyles.label }, [
                  h(FormattedMessage, { id: "login_request_account", onClick: () => actions.onAccountRegister() })
                ])
              ]),
            ])
          ]),
        ])
      ])
    ])
  ]);
};

export const createInitLoginViewState = (): LoginViewState => ({
  region: undefined,
  username: "",
  password: ""
});

export const createCredentialsFromLoginViewState = (loginViewState: LoginViewState): Credential => ({
  region: loginViewState.region || Region.OTHER,
  username: loginViewState.username.trim().toLowerCase(),
  password: loginViewState.password
});

const Login = withFormik<LoginProps, LoginViewState>({
  mapPropsToValues: createInitLoginViewState,
  validationSchema: Yup.object().shape({
    region: Yup.string().required("region_required"),
    username: Yup.string().required("login_username_required"),
    password: Yup.string().required("login_password_required"),
  }),
  validateOnChange: true,
  validateOnBlur: true,
  handleSubmit: (values, bag) => {
    bag.props.actions.onLogin(
      createCredentialsFromLoginViewState(values),
      bag.props.accountRestService,
      bag.props.accountDeviceStore,
      bag.props.redirectModule
    );
  }
})(LoginForm);


export default Login;
