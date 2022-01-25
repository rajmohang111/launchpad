import {ChartColor, ChartDataSets, ChartPoint} from "chart.js";
import {
  MeasurementAttributes,
  MeasurementGroup,
  MeasurementGroupPayload
} from "../../_common/models/measurements";
import {fromNullable, some} from "fp-ts/lib/Option";
import {CalculatedDeviceValues} from "../../overview/services/overview_services";
import {colors} from "../../../../../_common/styles/global";

export type ColorRange = {
  start: number,
  end: number,
  color: ChartColor,
};

export type ColorSettings = {
  ok: ColorRange,
  warn?: ColorRange,
  critical: ColorRange,
  zero: ColorRange,
};

export type DatasetColorSettings = {
  speed: ColorSettings,
  output: ColorSettings,
};

export function getDefaultColorsForDevice(calculatedValues: CalculatedDeviceValues): DatasetColorSettings {
  return {
    speed: {
      zero: {
        start: 0,
        end: 0,
        color: colors.atomic,
      },
      critical: {
        start: 1,
        end: calculatedValues.targetSpeed,
        color: colors.radicalRed,
      },
      ok: {
        start: calculatedValues.targetSpeed,
        end: Infinity,
        color: colors.teal,
      },
    },
    output: {
      zero: {
        start: 0,
        end: 0,
        color: colors.atomic,
      },
      critical: {
        start: 1,
        end: calculatedValues.targetOutput,
        color: colors.radicalRed,
      },
      ok: {
        start: calculatedValues.targetOutput,
        end: Infinity,
        color: colors.teal,
      },
    },
  };
}

export type TimedMeasurementAttribute = MeasurementAttributes & {
  timestamp: string | Date,
};

function extractSpeedMeasurement(mg: MeasurementGroup): TimedMeasurementAttribute | null {
  return some(mg)
  .map((m: MeasurementGroup) => fromNullable(m.attributes).getOrElse({} as MeasurementGroupPayload))
  .map((attr: MeasurementGroupPayload) => ({
    timestamp: attr.timestamp,
    ...attr.speed
  }))
  .toNullable();
}

function extractOutputMeasurement(mg: MeasurementGroup): TimedMeasurementAttribute | null {
  return some(mg)
  .map((m: MeasurementGroup) => fromNullable(m.attributes).getOrElse({} as MeasurementGroupPayload))
  .map((attr: MeasurementGroupPayload) => ({
    timestamp: attr.timestamp,
    ...attr.output,
  }))
  .toNullable();
}

enum ValueType {
  SPEED = "SPEED",
  OUTPUT = "OUTPUT",
}

enum LimitCriteria {
  CRITICAL = "CRITICAL",
  NULL = "NULL"
}

function toLimit(calculatedValues: CalculatedDeviceValues, valueType: ValueType = ValueType.SPEED, criteria: LimitCriteria = LimitCriteria.NULL): (tma: TimedMeasurementAttribute) => ChartPoint {
  return (tma: TimedMeasurementAttribute): ChartPoint => {
    switch (true) {
      case valueType === ValueType.SPEED && criteria === LimitCriteria.CRITICAL: {
        return {
          x: tma.timestamp,
          y: tma.data !== null && tma.data < 1 ? calculatedValues.maxSpeed : undefined,
        };
      }
      case valueType === ValueType.SPEED && criteria === LimitCriteria.NULL: {
        return {
          x: tma.timestamp,
          y: tma.data !== null ? undefined : calculatedValues.maxSpeed,
        };
      }
      case valueType === ValueType.OUTPUT && criteria === LimitCriteria.CRITICAL: {
        return {
          x: tma.timestamp,
          y: tma.data !== null && tma.data < 1 ? calculatedValues.maxOutput : undefined,
        };
      }
      case valueType === ValueType.OUTPUT && criteria === LimitCriteria.NULL: {
        return {
          x: tma.timestamp,
          y: tma.data !== null ? undefined : calculatedValues.maxOutput,
        };
      }
      default: {
        return {
          x: tma.timestamp,
          y: undefined,
        };
      }
    }
  };
}

function toChartPoint(tma: TimedMeasurementAttribute): ChartPoint {
  return {
    x: tma.timestamp,
    y: tma.data && tma.data !== null ? tma.data : undefined,
  };
}

function generateRpmChartDatasets(calculatedValues: CalculatedDeviceValues, measurementGroups: ReadonlyArray<MeasurementGroup> = [], displayMetersPerHour: boolean, dcs: DatasetColorSettings): ChartDataSets[] {
  const mgroups: ReadonlyArray<TimedMeasurementAttribute | null> = measurementGroups.map(extractSpeedMeasurement);
  return [
    {
      label: "rpm",
      data: mgroups.map(toChartPoint),
      backgroundColor: colors.teal65,
      borderColor: colors.teal,
      pointBackgroundColor: colors.teal65,
      pointBorderColor: colors.teal,
      borderWidth: 0.1,
      pointRadius: 0.5,
      lineTension: 1,
      cubicInterpolationMode: "monotone",
      hidden: displayMetersPerHour,
    },
    {
      label: "rpm - 0 values",
      data: mgroups.map(toLimit(calculatedValues, ValueType.SPEED, LimitCriteria.CRITICAL)),
      backgroundColor: colors.radicalRed65,
      borderColor: colors.radicalRed,
      pointBackgroundColor: colors.radicalRed65,
      pointBorderColor: colors.radicalRed,
      borderWidth: 0.1,
      pointRadius: 0.5,
      lineTension: 1,
      cubicInterpolationMode: "monotone",
      hidden: displayMetersPerHour,
    },
    {
      label: "rpm - null values",
      data: mgroups.map(toLimit(calculatedValues, ValueType.SPEED, LimitCriteria.NULL)),
      backgroundColor: colors.atomic25,
      borderColor: colors.atomic45,
      pointBackgroundColor: colors.atomic25,
      pointBorderColor: colors.atomic45,
      borderWidth: 0.1,
      pointRadius: 0.5,
      lineTension: 1,
      fill: true,
      cubicInterpolationMode: "monotone",
      hidden: displayMetersPerHour,
    },
  ];
}

function generateOutputChartDatasets(calculatedValues: CalculatedDeviceValues, measurementGroups: ReadonlyArray<MeasurementGroup> = [], displayMetersPerHour: boolean, dcs: DatasetColorSettings): ChartDataSets[] {
  const mgroups: ReadonlyArray<TimedMeasurementAttribute | null> = measurementGroups.map(extractOutputMeasurement);
  return [
    {
      label: "m/h",
      data: mgroups.map(toChartPoint),
      backgroundColor: colors.teal65,
      borderColor: colors.teal,
      pointBackgroundColor: colors.teal65,
      pointBorderColor: colors.teal,
      borderWidth: 0.1,
      pointRadius: 0.5,
      lineTension: 1,
      cubicInterpolationMode: "monotone",
      hidden: !displayMetersPerHour,
    },
    {
      label: "m/h - 0 values",
      data: mgroups.map(toLimit(calculatedValues, ValueType.OUTPUT, LimitCriteria.CRITICAL)),
      backgroundColor: colors.radicalRed65,
      borderColor: colors.radicalRed,
      pointBackgroundColor: colors.radicalRed65,
      pointBorderColor: colors.radicalRed,
      borderWidth: 0.1,
      pointRadius: 0.5,
      lineTension: 1,
      cubicInterpolationMode: "monotone",
      hidden: !displayMetersPerHour,
    },
    {
      label: "m/h - null values",
      data: mgroups.map(toLimit(calculatedValues, ValueType.OUTPUT, LimitCriteria.NULL)),
      backgroundColor: colors.atomic25,
      borderColor: colors.atomic45,
      pointBackgroundColor: colors.atomic25,
      pointBorderColor: colors.atomic45,
      borderWidth: 0.1,
      pointRadius: 0.5,
      lineTension: 1,
      fill: true,
      cubicInterpolationMode: "monotone",
      hidden: !displayMetersPerHour,
    },
  ];
}

export function generateChartDatasets(calculatedValues: CalculatedDeviceValues, measurementGroups: ReadonlyArray<MeasurementGroup> = [], displayMetersPerHour: boolean, dcs: DatasetColorSettings): ChartDataSets[] {
  return [
    ...generateRpmChartDatasets(calculatedValues, measurementGroups, displayMetersPerHour, dcs),
    ...generateOutputChartDatasets(calculatedValues, measurementGroups, displayMetersPerHour, dcs),
  ];
}
