import * as h from "react-hyperscript";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import MainView, { PreferenceViewActions } from "../views/Preferences";
import { RootState } from "../../../../../main/reducers/main";
import { getPreferencesState } from "../selectors/preferences";
import { createUpdatePreferenceAction, PreferencesActions } from "../actions/preferences";
import { createNavigateBackAction } from "../../../../../app/actions/routing";
import { ThunkDispatch } from "redux-thunk";
import { PreferencesState } from "../reducers/preferences";
import { DeviceStore, PassedDeviceStoreProps } from "../../../../../_common/storage/components/DeviceStore";

export type PreferenceProps = {
  preferencesState: PreferencesState,
  actions: PreferenceViewActions
};
const Main = (props: PreferenceProps) =>
  h(DeviceStore, { component: (deviceStores: PassedDeviceStoreProps) =>
      h(MainView, { preferenceDeviceStore: deviceStores.deviceStores.settingsDeviceStores.preferenceDeviceStores.preferenceDeviceStore, ...props })
  });

const mapStateToProps = (state: RootState) => ({
  preferencesState: getPreferencesState(state)
});
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, PreferencesActions>) => ({
  actions: {
    onPreferenceUpdate: bindActionCreators(createUpdatePreferenceAction, dispatch),
    onNavigateBack: bindActionCreators(createNavigateBackAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
