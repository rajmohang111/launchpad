import * as h from "react-hyperscript";
import { Button, Col, Page, Row } from "react-onsenui";
import { css, cx } from "emotion";

import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import LanguageSelector from "./LanguageSelector";
import { fonts } from "../../../../../_common/styles/global";
import {  simpleToolbarCreator } from "../../../../../_common/toolbar/factory";
import { createSettingsLeftElement } from "../../_common/toolbar";
import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import { preferencesModuleName } from "../../../../../_common/i18n/message/translations";
import { PreferencesState } from "../reducers/preferences";
import { PreferenceDeviceStore } from "../services/device_store";
import { InjectedFormikProps, withFormik } from "formik";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { PreferencesActions } from "../actions/preferences";
import { Preference } from "../../../../../_common/models/settings";
import { Locale } from "../../../../../_common/i18n/IntlProvider";
import LaunchpadCheckbox from "../../../../../_common/components/LaunchpadCheckbox";

export type PreferenceViewActions = {
  onPreferenceUpdate: (preference: Preference, preferenceDeviceStore: PreferenceDeviceStore) => ThunkAction<void, RootState, void, PreferencesActions>
};
export type PreferencesProps = {
  preferencesState: PreferencesState;
  preferenceDeviceStore: PreferenceDeviceStore;
  actions: ToolbarActions & PreferenceViewActions;
};

const mainStyles = {
  inputForm: css({
    margin: "30px"
  }),
  input: css({
    marginTop: "4px",
    width: "100%",
  }),
  mediumTopSpace: css({
    marginTop: "32px"
  }),
};

type PreferenceView = {
  language: string,
  hideTutorial: boolean
};

const PreferencesForm = (props: InjectedFormikProps<PreferencesProps, PreferenceView>) => {

  const {
    values,
    handleChange,
    handleSubmit,
    submitForm,
    actions
  } = props;
  return h(Page, { renderToolbar:simpleToolbarCreator(preferencesModuleName,
    createSettingsLeftElement(actions.onNavigateBack)
  )}, [
    h("form", { className: mainStyles.inputForm, onSubmit: handleSubmit }, [
      h(Row, { className: mainStyles.input }, [
        h("label", { className: fonts.fieldLabel }, [
          h(FormattedMessage, { id: "preferences_language" })
        ]),
        h(LanguageSelector, { language: values.language, handleChange })
      ]),
      h(Row, { className: cx( mainStyles.input, mainStyles.mediumTopSpace )}, [
        h("label", { className: fonts.fieldLabel }, [
          h(FormattedMessage, { id: "preferences_tutorials" })
        ])
      ]),
      h(Row, { className: mainStyles.input }, [
        h(Col, { width: "15%" }, [
          h(LaunchpadCheckbox, {
            id: "hideTutorial",
            checked: values.hideTutorial,
            onChange: handleChange
          })
        ]),
        h(Col, { width: "85%" }, [
          h("label", { className: "center", htmlFor: "hideTutorial" }, [
            h(FormattedMessage, { id: "preferences_tutorialsMsg" })
          ])
        ])
      ]),
      h(Row, { className: cx( mainStyles.input, mainStyles.mediumTopSpace ) }, [
        h(Button, { modifier: "large", onClick: submitForm }, [
          h(FormattedMessage, { id: "saveButtonName" })
        ])
      ])
    ])
  ]);

};

const viewFromPreferenceState = (preference: Preference): PreferenceView => ({
  language: preference.language,
  hideTutorial: preference.hideTutorial
});

const preferenceFromView = (preferenceView: PreferenceView): Preference => ({
  language: Locale[preferenceView.language],
  hideTutorial: preferenceView.hideTutorial
});

const PreferenceView = withFormik<PreferencesProps, PreferenceView>({
  mapPropsToValues: props => viewFromPreferenceState(props.preferencesState),
  handleSubmit: (values, bag) =>
    bag.props.actions.onPreferenceUpdate(preferenceFromView(values), bag.props.preferenceDeviceStore)
})(PreferencesForm);




export default PreferenceView;
