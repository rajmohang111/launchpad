import { BootstrapAction, bootstrapActionType } from "../bootstrap";
import { createTestSettings } from "../../../modules/settings/src/_common/__test_data__/device_store";

export const createTestBootstrapAction = (): BootstrapAction => ({
  type: bootstrapActionType,
  deviceStore: {
    settings: createTestSettings()
  }
});
