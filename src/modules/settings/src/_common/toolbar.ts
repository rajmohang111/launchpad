import { ToolbarPart } from "../../../../_common/toolbar/factory";

export const createSettingsLeftElement = (onClick: () => void): ToolbarPart => ({
  contentId:"",
  onClick
});
