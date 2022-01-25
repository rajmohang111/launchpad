import { colors } from "../../../../../_common/styles/global";
import { includes } from "lodash";

export const  isBelowThreshold = (current: number = 0, target: number = 0): boolean => {
  return current < target;
};

export const determineColor = (referenceKey: string, warnings: Array<string> = [], current: number = 0, target: number = 0)  => {
  switch (true) {
    case includes(warnings, referenceKey):
      return colors.disabledGrey;
    case isBelowThreshold(current, target):
      return colors.radicalRed;
    default:
      return colors.teal;
  }
};
