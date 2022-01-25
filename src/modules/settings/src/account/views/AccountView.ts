import * as h from "react-hyperscript";
import { Page } from "react-onsenui";

import { AccountState } from "../reducers/account";
import UserDetails from "./UserDetails";
import ChangePassword from "./ChangePassword";
import { accountModuleName } from "../../../../../_common/i18n/message/translations";
import {  simpleToolbarCreator } from "../../../../../_common/toolbar/factory";
import { createSettingsLeftElement  } from "../../_common/toolbar";
import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import { AccountRestService } from "../services/rest";
import { PassedRestProps, Rest } from "../../../../../_common/rest/components/Rest";
import { AccountUpdate } from "../models/account";
import { AccountDeviceStore } from "../services/device_store";
import { DeviceStore, PassedDeviceStoreProps } from "../../../../../_common/storage/components/DeviceStore";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { AccountAction } from "../actions/account";
import { Credential } from "../../../../../_common/rest/models/rest";

export type AccountProps = {
  accountState: AccountState,
  actions: ToolbarActions & {
    onAccountUpdate: (accountUpdate: AccountUpdate, credential: Credential, accountRestService: AccountRestService, accountDeviceStore: AccountDeviceStore) => ThunkAction<void, RootState, void, AccountAction>,
    onPasswordChange: (currentPasswordProvided: string, newPassword: string, credential: Credential, accountRestService: AccountRestService, accountDeviceStore: AccountDeviceStore) => ThunkAction<void, RootState, void, AccountAction>,
    onLogout: (accountDeviceStore: AccountDeviceStore) => ThunkAction<void, RootState, void, AccountAction>;
  }
};

const AccountView = ({ accountState, actions }: AccountProps) =>
  h(Page,{ renderToolbar:simpleToolbarCreator(accountModuleName,
    createSettingsLeftElement(actions.onNavigateBack)
  )}, [
    h(Rest, { component: (restServices: PassedRestProps) =>
      h(DeviceStore, { component: (deviceContext: PassedDeviceStoreProps) =>
        h("div", [
          h(UserDetails, { accountState, accountRestService: restServices.restServices.settings.accountRestService, accountDeviceStore: deviceContext.deviceStores.settingsDeviceStores.accountDeviceStores.accountDeviceStore, actions }),
          h(ChangePassword, { accountState, accountRestService: restServices.restServices.settings.accountRestService, accountDeviceStore: deviceContext.deviceStores.settingsDeviceStores.accountDeviceStores.accountDeviceStore, actions })
        ])
      })
    })
  ]);

export default AccountView;
