import * as React from "react";
import * as h from "react-hyperscript";
import { Col, Page, Row } from "react-onsenui";
import { InjectedFormikProps, withFormik } from "formik";
import * as Yup from "yup";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { css, cx } from "emotion";
import FormErrorMessages from "../../../../../_common/components/FormErrorMessages";
import { background, fonts } from "../../../../../_common/styles/global";
import { simpleToolbarCreator } from "../../../../../_common/toolbar/factory";
import {
  loginModuleName,
  registrationModuleName
} from "../../../../../_common/i18n/message/translations";
import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import SalutationSelector from "../../../../../_common/components/SalutationSelector";
import { NewAccount, Salutation } from "../../../../../_common/models/settings";
import { SharedAccountRestService } from "../../../../../_common/rest/models/settings";
import { SharedAccountDeviceStore } from "../../../../../_common/stores/settings";
import PendingButton from "../../../../../_common/components/PendingButton";
import { open } from "../../../../../_common/inAppBrowser/inAppBrowser";
import { I18N } from "../../../../../_common/i18n/components/I18N";
import { I18NContext } from "../../../../../_common/i18n/IntlProvider";
import RegionSelector, { isProduction } from "../../../../../_common/components/RegionSelector";
import { getRegionFrom, Region } from "../../../../../_common/models/system";
import LaunchpadInput from "../../../../../_common/components/LaunchpadInput";
import LaunchpadCheckbox from "../../../../../_common/components/LaunchpadCheckbox";
import { phoneFormatter } from "../../../../../_common/services/formatter";

export type RegistrationViewActions = ToolbarActions & {
  onSubmitAccountDetails: (newAccount: NewAccount, accountRestService: SharedAccountRestService) => void;
  onRegionChange: (region: Region, accountDeviceStore: SharedAccountDeviceStore) => void;
};
export type RegistrationProps = {
  requestPending: boolean,
  accountRestService: SharedAccountRestService,
  accountDeviceStore: SharedAccountDeviceStore,
  actions: RegistrationViewActions
};

const mainStyles = {
  inputForm: css({
    padding: "30px"
  }),
  mediumTopSpace: css({
    marginTop: "32px"
  }),
  inputBox: css({
    width: "100%",
    display: "block"
  }),
  input: css({
    marginTop: "4px",
    width: "100%",
  }),
  select: css({
    paddingRight: "5%",
  }),
  ackLink: css({
    textDecoration: "underline"
  }),
  page: css({
    background: background.mainGradient
  }),
};

export type RegistrationView = {
  customerNo: string;
  salutation: Salutation | undefined;
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  isAcknowledge: boolean,
  region: Region | undefined;
};

const createToolbarRenderer = (onClick: () => void) => simpleToolbarCreator(registrationModuleName, {
  contentId: loginModuleName,
  onClick
});

const MainForm = (props: InjectedFormikProps<RegistrationProps, RegistrationView>) => {

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    submitForm,
    actions,
    touched,
    isValid,
    submitCount
  } = props;
  const onRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(event);
    actions.onRegionChange(getRegionFrom(event.target.value), props.accountDeviceStore);
  };
  return h(Page, { renderToolbar: createToolbarRenderer(actions.onNavigateBack) }, [
    h("div", { className: mainStyles.page }, [
      h("form", { className: mainStyles.inputForm, onSubmit: handleSubmit }, [
        h(Row, { className: mainStyles.input }, [
          h("label", { className: fonts.fieldLabel, htmlFor: "customerNo" }, [
            h(FormattedMessage, { id: "customer_no" })
          ]),
          h(LaunchpadInput, {
            className: mainStyles.input,
            name: "customerNo",
            onChange: handleChange,
            value: values.customerNo,
            onBlur: handleBlur
          }),
          h(FormErrorMessages, {
            error: errors.customerNo,
            messageId: errors.customerNo,
            touched: touched.customerNo
          })
        ]),
        h(Row, { className: mainStyles.input }, [
          h(Col, { width: "35%", className: mainStyles.select }, [
            h("label", { className: fonts.fieldLabel }, [
              h(FormattedMessage, { id: "salutation" })
            ]),
            h(SalutationSelector, { value: values.salutation, actions: { onChange: handleChange } }),
            h(FormErrorMessages, {
              error: errors.salutation,
              messageId: errors.salutation,
              touched: touched.salutation
            })
          ]),
          h(Col, { width: "65%" }, [
            h("label", { className: fonts.fieldLabel }, [
              h(FormattedMessage, { id: "first_name" })
            ]),
            h(LaunchpadInput, {
              className: mainStyles.input,
              onChange: handleChange,
              name: "firstName",
              value: values.firstName,
              onBlur: handleBlur
            }),
            h(FormErrorMessages, {
              error: errors.firstName,
              messageId: errors.firstName,
              touched: touched.firstName
            })
          ])
        ]),
        h(Row, { className: mainStyles.input }, [
          h("label", { className: fonts.fieldLabel }, [
            h(FormattedMessage, { id: "name" })
          ]),
          h(LaunchpadInput, {
            className: mainStyles.input,
            onChange: handleChange,
            name: "lastName",
            value: values.lastName,
            onBlur: handleBlur
          }),
          h(FormErrorMessages, {
            error: errors.lastName,
            messageId: errors.lastName,
            touched: touched.lastName
          })
        ]),
        h(Row, { className: mainStyles.input }, [

          h("label", { className: fonts.fieldLabel }, [
            h(FormattedMessage, { id: "email" })
          ]),
          h(LaunchpadInput, {
            type: "text",
            className: mainStyles.input,
            onChange: handleChange,
            name: "email",
            value: values.email.trim(),
            onBlur: handleBlur
          }),
          h(FormErrorMessages, {
            error: errors.email,
            messageId: errors.email,
            touched: touched.email
          })
        ]),
        h(Row, { className: mainStyles.input }, [
          h("label", { className: fonts.fieldLabel }, [
            h(FormattedMessage, { id: "mobile" })
          ]),
          h(LaunchpadInput, {
            className: mainStyles.input,
            onChange: handleChange,
            name: "mobile",
            value: values.mobile,
            onBlur: handleBlur,
            type: "tel"
          }),
          h(FormErrorMessages, {
            error: errors.mobile,
            messageId: errors.mobile,
            touched: touched.mobile
          })
        ]),
        h(Row, { className: mainStyles.input }, [
          h("label", { className: fonts.fieldLabel }, [
            h(FormattedMessage, { id: "user_name" })
          ]),
          h(LaunchpadInput, {
            className: mainStyles.input,
            onChange: handleChange,
            name: "userName",
            value: values.email.toLowerCase(),
            disabled: true,
            onBlur: handleBlur
          })
        ]),
        h(Row, { className: mainStyles.input }, [
          h("label", { className: fonts.fieldLabel }, [
            h(FormattedMessage, { id: "region" })
          ]),
          h(RegionSelector, {value: values.region, actions: {onChange: onRegionChange}, isProduction}),
          h(FormErrorMessages, {
            error: errors.region,
            messageId: errors.region,
            touched: touched.region
          })
        ]),
        h(Row, { className: cx(mainStyles.input, mainStyles.mediumTopSpace) }, [
          h(Col, { width: "15%" }, [
            h(LaunchpadCheckbox, {
              onChange: handleChange,
              id: "isAcknowledge",
              checked: values.isAcknowledge
            }),
          ]),
          h(Col, { width: "85%" }, [
            h(I18N, {
              component: (i18N: I18NContext) =>
                h("label", { className: fonts.fieldLabel }, [
                  h(FormattedMessage, { id: "registration_acknowledge" }),
                  h("a", {
                    className: mainStyles.ackLink,
                    onClick: () => open("https://km-df.com/product/k.management/legal/terms-of-use/", i18N.intl.formatMessage("agree"))
                  }, [
                      h(FormattedMessage, { id: "registration_acknowledge_terms" })
                    ]),
                  h(FormattedMessage, { id: "registration_acknowledge_and" }),
                  h("a", {
                    className: mainStyles.ackLink,
                    onClick: () => open("https://km-df.com/product/k.management/legal/privacy-policy/", i18N.intl.formatMessage("agree"))
                  }, [
                      h(FormattedMessage, { id: "registration_acknowledge_privacy" })
                    ])
                ]),
            }),
            h(FormErrorMessages, {
              error: errors.isAcknowledge,
              messageId: errors.isAcknowledge,
              touched: touched.isAcknowledge
            })
          ]),
        ]),
        h(Row, { className: cx(mainStyles.input, mainStyles.mediumTopSpace) }, [
          h(PendingButton, {
            modifier: "large",
            disabled: props.requestPending,
            onClick: () => submitForm(),
            messageId: "registration_submit",
            requestPending: props.requestPending
          })
        ]),
        isValid || 0 === submitCount ? null : h(FormErrorMessages, {
          error: "true",
          messageId: "registration_fill_required_fields",
          touched: true
        })
      ])
    ])
  ]);

};

export const initRegistrationView = (): RegistrationView => ({
  customerNo: "",
  salutation: undefined,
  firstName: "",
  lastName: "",
  email: "",
  mobile: undefined,
  region: undefined,
  isAcknowledge: false
});

export const createNewAccountFromRegistrationView = (accountDetails: RegistrationView): NewAccount => ({
  person: {
    firstName: accountDetails.firstName,
    lastName: accountDetails.lastName,
    salutation: accountDetails.salutation || Salutation.MR,
    customerNumber: accountDetails.customerNo
  },
  contact: {
    eMail: accountDetails.email.trim().toLowerCase(),
    mobileNumber: accountDetails.mobile ? phoneFormatter(accountDetails.mobile) : undefined
  },
  credential: {
    region: accountDetails.region || Region.OTHER,
    username: accountDetails.email.toLowerCase(),
  },
  metadata: {
    isEmailVerified: false,
    isActive: false,
  }
});

const Main = withFormik<RegistrationProps, RegistrationView>({
  mapPropsToValues: initRegistrationView,
  validationSchema: Yup.object().shape({
    customerNo: Yup.string().required("registration_customerno_required"),
    firstName: Yup.string().required("registration_firstname_required"),
    lastName: Yup.string().required("registration_lastname_required"),
    salutation: Yup.string().required("registration_salutation_required"),
    email: Yup.string()
      .required("registration_email_required")
      .email("registration_email_invaild"),
    mobile: Yup.string()
    .matches(/^\+[1-9]{1}([0-9]| |-){1,22}$/, "registration_mobile_phone_number_invalid"),
    isAcknowledge: Yup.bool()
      .required("registration_isAcknowledge_required")
      .oneOf([true], "registration_isAcknowledge_required"),
    region: Yup.string().required("region_required")

  }),
  handleSubmit: (values, bag) => {
    bag.props.actions.onSubmitAccountDetails(
      createNewAccountFromRegistrationView(values),
      bag.props.accountRestService,
    );
  }
})(MainForm);


export default Main;

