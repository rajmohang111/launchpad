import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import { InjectedFormikProps, withFormik } from "formik";
import * as Yup from "yup";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { Page, Row } from "react-onsenui";
import FormErrorMessages from "../../../../../_common/components/FormErrorMessages";
import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import PendingButton from "../../../../../_common/components/PendingButton";
import { background } from "../../../../../_common/styles/global";
import { Region } from "../../../../../_common/models/system";
import { SharedAccountDeviceStore } from "../../../../../_common/stores/settings";
import RegionSelector, { isProduction } from "../../../../../_common/components/RegionSelector";
import { SharedAccountRestService } from "../../../../../_common/rest/models/settings";
import LaunchpadInput from "../../../../../_common/components/LaunchpadInput";

export type ResetPasswordViewActions = ToolbarActions & {
  onSubmit: (email: string, region: Region, accountRestService: SharedAccountRestService, accountDeviceStore: SharedAccountDeviceStore) => void;
};

export type ResetPasswordProps = {
  actions: ResetPasswordViewActions,
  accountRestService: SharedAccountRestService,
  accountDeviceStore: SharedAccountDeviceStore
};

const resetPasswordStyles = {
  headingContent: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "84px"
  }),
  superLargeTopSpace: css({
    marginTop: "42px"
  }),
  largeTopSpace: css({
    marginTop: "32px"
  }),
  bitmap: css({
    width: "79.5%",
  }),
  mediumBottomSpace: css({
    marginBottom: "24px"
  }),
  input: css({
    marginTop: "5px",
    width: "100%",
  }),
  page: css({
    minHeight: "100%",
    background: background.mainGradient,
    padding: "30px"
  })
};

type ResetPasswordViewState = {
  email: string,
  region: Region | undefined
};

const ResetPasswordForm = (props: InjectedFormikProps<ResetPasswordProps, ResetPasswordViewState>) => {
  const {
    values,
    handleChange,
    handleSubmit,
    submitForm,
    errors,
    actions,
    handleBlur,
    touched
  } = props;
  return h(Page, [
    h("div", { className: resetPasswordStyles.page }, [
      h("form", { onSubmit: handleSubmit }, [
        h("div", [
          h("div", [
            h("div", { className: resetPasswordStyles.headingContent }, [
              h("img", {
                className: resetPasswordStyles.bitmap,
                src: "static/images/KM_ON_Logo_without_Claim_colour_sRGB.svg"
              }),
            ]),
            h("div", { className: resetPasswordStyles.superLargeTopSpace }, [
              h("span", [
                h(Row, { className: resetPasswordStyles.input }, [
                  h("label", [
                    h(FormattedMessage, { id: "region" })
                  ]),
                  h(RegionSelector, { value: values.region, actions: { onChange: handleChange }, isProduction }),
                  h(FormErrorMessages, {
                    error: errors.region,
                    messageId: errors.region,
                    touched: touched.region
                  })
                ]),
                h("div", { className: resetPasswordStyles.input }, [
                  h("label", [
                    h(FormattedMessage, { id: "email" })
                  ]),
                  h(LaunchpadInput, {
                    modifier: "material",
                    type: "text",
                    className: resetPasswordStyles.input,
                    onChange: handleChange,
                    name: "email",
                    value: values.email,
                    onBlur: handleBlur
                  }),
                  h(FormErrorMessages, {
                    error: errors.email,
                    messageId: errors.email,
                    touched: touched.email
                  }),
                ]),
                h(PendingButton, {
                  modifier: "large--quiet",
                  ripple: true,
                  className: cx(resetPasswordStyles.largeTopSpace, "button"),
                  onClick: () => submitForm(),
                  requestPending: false,
                  messageId: "registration_submit"
                }),
                h(PendingButton, {
                  modifier: "large--cta",
                  ripple: true,
                  className: cx(resetPasswordStyles.largeTopSpace, resetPasswordStyles.mediumBottomSpace),
                  onClick: () => actions.onNavigateBack(),
                  requestPending: false,
                  messageId: "back"
                })
              ]),
            ])
          ]),
        ])
      ])
    ])
  ]);
};

const createInitResetPasswordViewState = (): ResetPasswordViewState => ({
  email: "",
  region: undefined
});

const ResetPassword = withFormik<ResetPasswordProps, ResetPasswordViewState>({
  mapPropsToValues: createInitResetPasswordViewState,
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .required("registration_email_required")
      .email("registration_email_invaild"),
    region: Yup.string().required("region_required")

  }),
  validateOnChange: true,
  validateOnBlur: true,
  handleSubmit: (values, bag) => {
    bag.props.actions.onSubmit(
      values.email,
      values.region || Region.OTHER,
      bag.props.accountRestService,
      bag.props.accountDeviceStore
    );
  }
})(ResetPasswordForm);

export default ResetPassword;
