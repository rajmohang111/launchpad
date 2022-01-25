import { default as InjectIntl, IntlProviderProps, Locale } from "../../_common/i18n/IntlProvider";
import { RootState } from "../../main/reducers/main";
import { getGlobalState } from "../../_common/selectors/global";
import { connect } from "react-redux";
import * as h from "react-hyperscript";

export type IntlProviderReduxProps = IntlProviderProps;

const IntlRedux = (props: IntlProviderReduxProps) =>
  h(InjectIntl, { ...props, key: props.locale });

const mapStateToProps = (state: RootState): IntlProviderReduxProps => ({
  locale: Locale[getGlobalState(state).translations.locale],
  messages: getGlobalState(state).translations.messages
});

export default connect(mapStateToProps)(IntlRedux);
