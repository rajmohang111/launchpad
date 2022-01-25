import * as h from "react-hyperscript";
import { Button, Col, Row } from "react-onsenui";
import { InjectedFormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { css, cx } from "emotion";

import { AccountState } from "../reducers/account";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import FormErrorMessages from "../../../../../_common/components/FormErrorMessages";
import SalutationSelector from "../../../../../_common/components/SalutationSelector";
import { colors, fonts } from "../../../../../_common/styles/global";
import { Contact, Person, Salutation, salutationFromString } from "../../../../../_common/models/settings";
import { AccountRestService } from "../services/rest";
import { AccountUpdate } from "../models/account";
import { AccountDeviceStore } from "../services/device_store";
import PendingButton from "../../../../../_common/components/PendingButton";
import { Credential } from "../../../../../_common/rest/models/rest";
import LaunchpadInput from "../../../../../_common/components/LaunchpadInput";
import { phoneFormatter } from "../../../../../_common/services/formatter";

export type UserDetailsProps = {
  accountState: AccountState,
  accountRestService: AccountRestService,
  accountDeviceStore: AccountDeviceStore,
  actions: {
    onAccountUpdate: (accountUpdate: AccountUpdate, credential: Credential, accountRestService: AccountRestService, accountDeviceStore: AccountDeviceStore) => void,
    onLogout: (accountDeviceStore: AccountDeviceStore) => void;
  }
};

export type UserDetailsViewState = {
  salutation: string,
  firstName: string,
  lastName: string,
  mobileNumber?: string,
  customerNumber: string,
  userName: string,
  email: string
};

const mainStyles = {
  inputForm: css({
    margin: "0 30px 30px 30px",
  }),
  input: css({
    marginTop: "4px",
    width: "100%",
    "> ons-input[disabled]": {
      opacity: 1,
      "> input": css({
        color: colors.atomic
      })
    }
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
  select: css({
    paddingRight: "5%",
  }),
  largeMarginTop: css({
    paddingTop: "72px",
    marginTop: "0px"
  })
};

const UserDetailsForm = (props: InjectedFormikProps<UserDetailsProps, UserDetailsViewState>) => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    submitForm,
    actions,
    accountDeviceStore,
    isValid,
    handleBlur,
    touched
  } = props;
  return h("form", { className: mainStyles.inputForm, onSubmit: handleSubmit }, [
    h(Row, { className: mainStyles.headerRow }, [
      h("label", { className: mainStyles.header }, [
        h(FormattedMessage, { id: "logged_in_as" }),
        ` ${values.firstName ? values.firstName : ""} ${values.lastName ? values.lastName : ""}`
      ])
    ]),
    h(Row, { className: cx(mainStyles.input, mainStyles.largeMarginTop) }, [
      h("label", { className: fonts.fieldLabel }, [
        h(FormattedMessage, { id: "customer_no" })
      ]),
      h(LaunchpadInput, {
        className: mainStyles.input,
        type: "text",
        disabled: true,
        value: values.customerNumber,
        name: "customerNo"
      })
    ]),
    h(Row, { className: mainStyles.input }, [
      h("label", { className: fonts.fieldLabel }, [
        h(FormattedMessage, { id: "user_name" })
      ]),
      h(LaunchpadInput, {
        className: mainStyles.input,
        type: "text",
        disabled: true,
        value: values.userName,
        name: "userName"
      })
    ]),
    h(Row, { className: mainStyles.input }, [
      h("label", { className: fonts.fieldLabel }, [
        h(FormattedMessage, { id: "email" })
      ]),
      h(LaunchpadInput, {
        className: mainStyles.input,
        type: "email",
        disabled: true,
        value: values.email,
        name: "email"
      })
    ]),
    h(Row, { className: cx(mainStyles.input, mainStyles.mediumSpace) }, [
      h(Button, { modifier: "large", onClick: () => actions.onLogout(accountDeviceStore) }, [
        h(FormattedMessage, { id: "account_logout" })
      ])
    ]),
    h(Row, { className: cx(mainStyles.input, mainStyles.headerRow) }, [
      h("label", { className: mainStyles.header }, [
        h(FormattedMessage, { id: "personal_data" })
      ])
    ]),
    h(Row, { className: cx(mainStyles.input, mainStyles.largeMarginTop) }, [
      h(Col, { width: "35%", className: mainStyles.select }, [
        h("label", { className: fonts.fieldLabel }, [
          h(FormattedMessage, { id: "salutation" })
        ]),
        h(SalutationSelector, { value: values.salutation, actions: { onChange: handleChange } }),
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
        h(FormErrorMessages, { error: errors.firstName, messageId: errors.firstName, touched: touched.firstName })
      ])
    ]),
    h(Row, { className: mainStyles.input }, [
      h("label", [
        h(FormattedMessage, { id: "name" })
      ]),
      h(LaunchpadInput, {
        className: mainStyles.input,
        value: values.lastName,
        onChange: handleChange,
        name: "lastName",
        onBlur: handleBlur
      }),
      h(FormErrorMessages, { error: errors.lastName, messageId: errors.lastName, touched: touched.lastName }),
    ]),
    h(Row, { className: mainStyles.input }, [
      h("label", [
        h(FormattedMessage, { id: "mobile" })
      ]),
      h(LaunchpadInput, {
        className: mainStyles.input,
        value: values.mobileNumber,
        onChange: handleChange,
        name: "mobileNumber",
        type: "tel",
        onBlur: handleBlur
      }),
      h(FormErrorMessages, { error: errors.mobileNumber, messageId: errors.mobileNumber, touched: touched.mobileNumber }),
    ]),
    h(Row, { className: cx(mainStyles.input, mainStyles.mediumSpace) }, [
      h(PendingButton, { modifier: "large", onClick: submitForm, messageId: "account_save_personal_details", requestPending: props.accountState.metadata.requestPending, disabled: !isValid })
    ]),
  ]);
};

export const createUserDetailsViewState = (contact: Contact, person: Person, credential: Credential): UserDetailsViewState => ({
  firstName: person ? person.firstName : "",
  lastName: person ? person.lastName : "",
  salutation: person ? person.salutation : Salutation.MR,
  mobileNumber: person ? contact.mobileNumber : undefined,
  customerNumber: person.customerNumber ? person.customerNumber : "",
  userName: credential ? credential.username : "",
  email: contact ? contact.eMail : ""
});

export const createAccountUpdate = (userDetails: UserDetailsViewState): AccountUpdate => ({
  person: {
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    salutation: salutationFromString(userDetails.salutation)
  },
  contact: {
    mobileNumber: userDetails.mobileNumber ? phoneFormatter(userDetails.mobileNumber) : undefined
  },
  credential: {}
});


const UserDetails = withFormik<UserDetailsProps, UserDetailsViewState>({
  enableReinitialize: true,
  mapPropsToValues: props => createUserDetailsViewState(props.accountState.account.contact, props.accountState.account.person, props.accountState.account.credential),
  validationSchema: Yup.object().shape({
    salutation: Yup.string().required("account_title_required"),
    firstName: Yup.string().required("account_firstName_required"),
    lastName: Yup.string().required("account_name_required"),
    mobileNumber: Yup.string().matches(/^\+[1-9]{1}([0-9]| |-){1,22}$/, "account_mobile_phone_number_invalid"),
  }),
  handleSubmit: (values, bag) => {
    bag.props.actions.onAccountUpdate(
      createAccountUpdate(values),
      bag.props.accountState.account.credential,
      bag.props.accountRestService,
      bag.props.accountDeviceStore
    );
  }
})(UserDetailsForm);

export default UserDetails;
