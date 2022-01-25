import * as h from "react-hyperscript";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import AccountView, { AccountProps } from "../views/AccountView";
import { RootState } from "../../../../../main/reducers/main";
import * as actions from "../thunks/account";
import { createNavigateBackAction } from "../../../../../app/actions/routing";
import { ThunkDispatch } from "redux-thunk";
import { getAccountState } from "../../../../../_common/selectors/settings";
import { AccountAction } from "../actions/account";

const Account = (props: AccountProps) =>
  h(AccountView, props);

const mapStateToProps = (state: RootState) => ({
  accountState: getAccountState(state)
});
const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AccountAction>) => ({
  actions: {
    onAccountUpdate: bindActionCreators(actions.createAccountUpdateAction, dispatch),
    onPasswordChange: bindActionCreators(actions.createPasswordUpdateAction, dispatch),
    onLogout: bindActionCreators(actions.performLogout, dispatch),
    onNavigateBack: bindActionCreators(createNavigateBackAction, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
