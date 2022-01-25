import { mount } from "enzyme";
import * as h from "react-hyperscript";
import IntlProvider, { Locale } from "../../../../../../_common/i18n/IntlProvider";
import { getDefaultTranslation } from "../../../../../../_common/i18n/message/translations";
import PreferencesForm, { PreferencesProps } from "../Preferences";
import { createPreferencesStateInitState } from "../../reducers/preferences";
import { createPreferenceTestStore } from "../../services/__test_data__/device_store";

describe("Preferences", () => {

  const preferencesProps: PreferencesProps = {
    preferencesState: createPreferencesStateInitState(),
    preferenceDeviceStore: createPreferenceTestStore(),
    actions: {
      onNavigateBack: jest.fn(),
      onPreferenceUpdate: jest.fn()
    }
  };

  it("renders", () => {

    const TestPreferences = h(IntlProvider, { messages: getDefaultTranslation().messages, locale: Locale.en }, [
      h(PreferencesForm, preferencesProps)
    ]);

    const wrapper = mount(TestPreferences);
    expect(wrapper).not.toEqual(undefined);

  });

});
