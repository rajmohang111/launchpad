import * as React from "react";
import {
  createProductivityRestService,
  ProductivityRestService
} from "../../../modules/productivity/src/_common/services/rest";
import * as PropTypes from "prop-types";
import * as h from "react-hyperscript";
import { createSettingsRestServices, SettingsRestServices } from "../../../modules/settings/src/_common/rest";
import { RootState } from "../../../main/reducers/main";
import { determineHost, getAccountCredential } from "../../selectors/settings";
import { connect } from "react-redux";
import { Credential } from "../../models/settings";

export type RestContext = {
  restServices?: {
    fetch: GlobalFetch,
    productivity: ProductivityRestService,
    settings: SettingsRestServices
  },
  credential: Credential
};
export type RestProviderOwnProps = {
  fetch: GlobalFetch
};

export type RestProviderProps = RestProviderOwnProps & {
  credential: Credential
};

class RestProviderInternal extends React.Component<RestProviderProps> {

  static childContextTypes = {
    restServices: PropTypes.object,
    credential: PropTypes.object
  };

  getChildContext(): RestContext {
    const {fetch, credential} = this.props;
    return {
      restServices: {
        fetch: this.props.fetch,
        productivity: createProductivityRestService(fetch, determineHost(credential.region)),
        settings: createSettingsRestServices(fetch, determineHost(credential.region))
      },
      credential: this.props.credential
    };
  }

  render() {
    return h("div", [this.props.children]);
  }

}

const mapStateToProps = (state: RootState, ownProps: RestProviderOwnProps) => ({
  ...ownProps,
  credential: getAccountCredential(state)
});

export const RestProvider = connect(mapStateToProps)(RestProviderInternal);
