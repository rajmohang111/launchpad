import { createSelector, Selector } from "reselect";
import { RootState } from "../../../../../main/reducers/main";
import { RegistrationState } from "../reducers/registration";
import { getModules } from "../../../../../_common/selectors/modules";
import { fromNullable } from "fp-ts/lib/Option";

export const getRegistrationState: Selector<RootState, RegistrationState> = createSelector(
  [getModules],
  modules => modules.registration
);

export const getRegistrationRequestPending: Selector<RootState, boolean> = createSelector(
  [getRegistrationState],
  (state: RegistrationState) => fromNullable(state)
    .map((state) => state.metadata)
    .map((metadata: { requestPending: boolean }) => metadata.requestPending)
    .getOrElse(false)
);
