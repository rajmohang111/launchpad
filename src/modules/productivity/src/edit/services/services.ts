import { isFinite } from "lodash";

export const setRangeValue = (value: number, maxValue: number) => Math.floor((value * 100) / maxValue);

export const getRangeValue = (value: number, maxValue: number) => (100 / maxValue * value) <= 100 ? 100 / maxValue * value : 100;

export const maxValidityCheck = (value: number, maxValue: number) => isFinite(value) ? Number(value) <= Number(maxValue) : true;

export const minValidityCheck = (value: number, minValue: number) => isFinite(value) ? Number(value) >= Number(minValue) : true;

export const getUnitLabel = (unit: string): string => {
  switch (unit) {
    case "percent": return "productivity_percent";
    case "mh": return "productivity_metersPerHour";
    case "rpm": return "productivity_rpm";
    default: return unit;
  }
};
