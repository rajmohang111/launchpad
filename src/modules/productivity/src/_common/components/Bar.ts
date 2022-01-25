import * as h from "react-hyperscript";
import {css, cx} from "emotion";
import {colors, fonts} from "../../../../../_common/styles/global";
import {isNaN} from "formik";
import {getCalculatedValuesForDevice} from "../../overview/services/overview_services";
import {Device} from "../models/device";
import {get, includes} from "lodash";
import { getBarContainerColor, getBarColor, getTextColor } from "../services/bar";

const mainStyles = {
  barContainer: css({
    float: "left",
    height: "30px",
    width: "100%",
    backgroundColor: colors.teal19,
    borderRadius: "5px",
    position: "relative",
  }),
  barContainerCritical: css({
    backgroundColor: colors.radicalRed28,
  }),
  bar: css({
    float: "left",
    backgroundColor: colors.teal,
    borderRadius: "5px",
    height: "30px"
  }),
  barCritical: css({
    backgroundColor: colors.radicalRed28,
  }),
  deviceText: css({
    float: "left",
    height: "30px",
    color: "white",
    fontSize: "small",
    padding: "5px",
    "& span": fonts.listItem
  }),
  deviceTextCritical: css({
    color: colors.radicalRed,
  }),
  targetLevelIndicator: css({
    position: "absolute",
    float: "left",
    width: "2px",
    height: "30px",
    backgroundColor: colors.white75,
  }),
  disabled: css({
    color: colors.disabledGrey
  })
};

export type BarColorProps = {
  fillLevel: number;
  targetLevel: number;
  targetPerformance?: number;
  disabled?: boolean;
};

export interface ArrayClassNameArg extends Array<ClassNameArg> {
}

export type ClassNameArg =
  | undefined | null | boolean | string
  | { [key: string]: undefined | null | boolean | string }
  | ArrayClassNameArg;

export type BarProps = BarColorProps & {
  content: string | number;
};



export const BarComponent = ({fillLevel, targetLevel, content, targetPerformance = 0, disabled}: BarProps) => {
  const internalFillLevel = isNaN(fillLevel) ? 0 : fillLevel;
  const internalTargetLevel = isNaN(targetLevel) ? 0 : targetLevel;
  const internalContent = typeof content === "number" && isNaN(content) ? 0 : content;
  const internalTargetPerf = isNaN(targetPerformance) ? 0 : targetPerformance;

  return h("div", {
    className: getBarContainerColor(internalFillLevel, mainStyles.barContainer, mainStyles.barContainerCritical),
  }, [
    h("div", {
      className: getBarColor(mainStyles.bar, mainStyles.barCritical, {
        fillLevel: internalFillLevel,
        targetLevel: internalTargetLevel,
        targetPerformance: internalTargetPerf
      }),
      style: {"width": `${Math.min(internalFillLevel, 100)}%`}
    }, [
      h("div", {
        className: getTextColor(mainStyles.deviceText, mainStyles.deviceTextCritical, mainStyles.disabled, {
          fillLevel: internalFillLevel,
          targetLevel: internalTargetLevel,
          targetPerformance: internalTargetPerf,
          disabled
        })
      }, [
        h("span", `${internalContent}`)
      ]),
    ]),
    internalTargetLevel > 0 && internalTargetLevel < 100 ? h("div", {
      className: cx(mainStyles.targetLevelIndicator),
      style: {"left": `${Math.min(internalTargetLevel, 100)}%`}
    }) : null,
  ]);
};

export type GetBarComponentHelperProps = {
  device: Device | null,
  displayMetersPerHour?: boolean;
};

export const getBarComponentHelper = ({device, displayMetersPerHour = false}: GetBarComponentHelperProps) => {
  const calc = getCalculatedValuesForDevice(device);
  const warnings = get(device, "measurementWarnings", []);
  return h(BarComponent, {
    content: displayMetersPerHour ? calc.currentOutput : calc.currentSpeed,
    fillLevel: displayMetersPerHour ? calc.outputPercentage : calc.speedPercentage,
    targetLevel: displayMetersPerHour ? calc.outputTargetLevel : calc.speedTargetLevel,
    targetPerformance: calc.targetPerformance,
    disabled: displayMetersPerHour ? includes(warnings, "OUTPUT_MEASUREMENT_OUTDATED"): includes(warnings, "SPEED_MEASUREMENT_OUTDATED")
  });
};
