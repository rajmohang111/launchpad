import * as h from "react-hyperscript";
import { Row } from "react-onsenui";
import { InjectedFormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { css, cx } from "emotion";

import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import FormErrorMessages from "../../../../../_common/components/FormErrorMessages";
import { colors, fonts } from "../../../../../_common/styles/global";
import { AccountRestService } from "../services/rest";
import { AccountState } from "../reducers/account";
import { AccountDeviceStore } from "../services/device_store";
import { Account } from "../../../../../_common/models/settings";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { AccountAction } from "../actions/account";
import PendingButton from "../../../../../_common/components/PendingButton";
import { Credential } from "../../../../../_common/rest/models/rest";
import LaunchpadInput from "../../../../../_common/components/LaunchpadInput";

export type ChangePasswordProps = {
  accountState: AccountState,
  accountRestService: AccountRestService,
  accountDeviceStore: AccountDeviceStore,
  actions: {
    onPasswordChange: (currentPasswordProvided: string, newPassword: string, credential: Credential, accountRestService: AccountRestService, accountDeviceStore: AccountDeviceStore) => ThunkAction<void, RootState, void, AccountAction>
  }
};

export type ChangePasswordViewState = {
  currentState: string,
  current: string,
  new: string,
  newRepeat: string
};

const mainStyles = {
  inputForm: css({
    margin: "30px"
  }),
  input: css({
    marginTop: "4px",
    width: "100%",
  }),
  mediumSpace: css({
    marginTop: "32px",
    marginBottom: "32Px"
  }),
  header: css({
    fontSize: "17px",
    fontWeight: "bold",
    textAlign: "center",
    height: "60px",
    lineHeight: "60px",
    width: "100%"
  }),
  headerRow: css({
    margin: "0 -30px 0 -30px",
    position: "absolute",
    backgroundColor: colors.white50,
  }),
  largeMarginTop: css({
    paddingTop: "72px",
    marginTop: "0px"
  })
};

const ChangePasswordForm = (props: InjectedFormikProps<ChangePasswordProps, ChangePasswordViewState>) => {
  const {
    values,
    handleChange,
    handleSubmit,
    submitForm,
    errors,
    isValid,
    handleBlur,
    touched
  } = props;
  return (
    h("form", { className: mainStyles.inputForm, onSubmit: handleSubmit }, [
      h(Row, { className: mainStyles.headerRow }, [
        h("label", { className: mainStyles.header }, [
          h(FormattedMessage, { id: "reset_password" })
        ])
      ]),
      h(Row, { className: cx(mainStyles.input, mainStyles.largeMarginTop) }, [
        h("label", { className: fonts.fieldLabel }, [
          h(FormattedMessage, { id: "account_currentPassword" })
        ]),
        h(LaunchpadInput, {
          className: mainStyles.input,
          type: "password",
          value: values.current,
          onChange: handleChange,
          name: "current",
          onBlur: handleBlur
        }),
        h(FormErrorMessages, { error: errors.current, messageId: errors.current, touched: touched.current })
      ]),
      h(Row, { className: mainStyles.input }, [
        h("label", { className: fonts.fieldLabel }, [
          h(FormattedMessage, { id: "account_newPassword" })
        ]),
        h(LaunchpadInput, {
          className: mainStyles.input,
          type: "password",
          value: values.new,
          onChange: handleChange,
          name: "new",
          onBlur: handleBlur
        }),
        h(FormErrorMessages, { error: errors.new, messageId: errors.new, touched: touched.new }),
      ]),
      h(Row, { className: mainStyles.input }, [
        h("label", { className: fonts.fieldLabel }, [
          h(FormattedMessage, { id: "account_repeatPassword" })
        ]),
        h(LaunchpadInput, {
          className: mainStyles.input,
          type: "password",
          value: values.newRepeat,
          onChange: handleChange,
          name: "newRepeat",
          onBlur: handleBlur
        }),
        h(FormErrorMessages, { error: errors.newRepeat, messageId: errors.newRepeat, touched: touched.newRepeat }),
      ]),
      h(Row, { className: cx(mainStyles.input, mainStyles.mediumSpace) }, [
        h(PendingButton, { modifier: "large", onClick: () => submitForm(), messageId: "account_changePassword", requestPending: props.accountState.metadata.requestPending, disabled: !isValid })
      ])
    ])
  );
};

const initChangePasswordView = (account: Account): ChangePasswordViewState => ({
  currentState: account.credential.password,
  current: "",
  new: "",
  newRepeat: ""
});

const ChangePassword = withFormik<ChangePasswordProps, ChangePasswordViewState>({
  mapPropsToValues: props => initChangePasswordView(props.accountState.account),
  validationSchema: Yup.object().shape({
    current: Yup.string().oneOf([Yup.ref("currentState"), null], "account_current_password_mismatch").required("account_password_required"),
    new: Yup.string()
      .required("password_password_required")
      .min(10, "password_min_characters_required")
      .matches(/[a-z]/, "password_lower_char_required")
      .matches(/[A-Z]/, "password_upper_char_required")
      .matches(/.*[0-9].*/, "password_number_required"),
    newRepeat: Yup.string().oneOf([Yup.ref("new"), null], "password_mismatch").required("password_repeat_password_required")
  }),
  handleSubmit: (values, bag) => {
    bag.props.actions.onPasswordChange(
      values.current,
      values.new,
      bag.props.accountState.account.credential,
      bag.props.accountRestService,
      bag.props.accountDeviceStore
    );
    bag.resetForm();
  }
})(ChangePasswordForm);

export default ChangePassword;
