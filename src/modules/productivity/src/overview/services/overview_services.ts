import {isNaN} from "formik";
import {get, first} from "lodash";
import {
  Analytics, AnalyticsAttributes, AnalyticsPayload,
  AnalyticsRelationship,
  Device,
  Measurement,
  MeasurementPayload,
  MeasurementRelationship
} from "../../_common/models/device";
import {fromNullable} from "fp-ts/lib/Option";

export const randomPercentageCalculation = (performance: number[]) => {
    return performance[Math.floor(performance.length * Math.random())];
};

export const progressbarCalcByPercentage = (percentage: number) => {
    return 200 * percentage / 100;
};

export const calculateProductivityPercentage = (current: number, target: number): number => {
  const currentValue = isNaN(current) ? 0 : current;
  const targetValue = isNaN(target) ? 0 : target;
  if (targetValue !== 0) {
    return Math.round((currentValue / targetValue) * 100);
  }
  return 0;
};

export type CalculatedDeviceValues = {
  currentSpeed: number,
  currentOutput: number,
  currentAvailability: number,
  currentPerformance: number,
  maxSpeed: number,
  maxOutput: number,
  targetSpeed: number,
  targetOutput: number,
  targetPerformance: number,
  speedPercentage: number,
  outputPercentage: number,
  speedTargetLevel: number,
  outputTargetLevel: number,
};

function extractRelationFromDevice(device: Device | null, relationship: string): MeasurementRelationship | AnalyticsRelationship | null {
  return fromNullable(device)
    .mapNullable(device => device.relationships)
    .mapNullable(rel => rel[relationship])
    .toNullable();
}

function extractMeasurementFromDevice(device: Device | null, measurementKey: string): number {
  const measurements: Array<MeasurementPayload> = fromNullable(extractRelationFromDevice(device, "measurements"))
    .mapNullable((relationship: MeasurementRelationship) => relationship.data)
    .mapNullable((data: Array<Measurement>) => data.map(m => m.attributes))
    .mapNullable((payloads: Array<MeasurementPayload>) => payloads.filter(payload => payload.type === measurementKey))
    .getOrElse([]);
  return fromNullable(first(measurements))
    .mapNullable<string | number>((first: MeasurementPayload) => first.data)
    .mapNullable<number>((mData: string | number) => {
      if (typeof mData === "string") {
        return parseInt(mData, 10);
      }
      return mData;
    })
    .getOrElse(0);
}

function extractAnalyticsFromDevice(device: Device | null, analyticsKey: string): number {
  const analytics: Array<AnalyticsAttributes> = fromNullable(extractRelationFromDevice(device, "analytics"))
    .mapNullable((relationship: AnalyticsRelationship) => relationship.data)
    .mapNullable((data: Array<Analytics>) => data.map(m => m.attributes))
    .mapNullable<Array<AnalyticsAttributes>>((payloads: Array<AnalyticsPayload>) => payloads.map(payload => payload[analyticsKey]))
    .getOrElse([]);
  return fromNullable(first(analytics))
    .mapNullable<string | number>((first: AnalyticsAttributes) => first.data)
    .mapNullable<number>((data: string | number) => {
      if (typeof data === "string") {
        return parseInt(data, 10);
      }
      return data;
    })
    .getOrElse(0);
}

export const getCalculatedValuesForDevice = (device: Device | null): CalculatedDeviceValues => {
  const currentSpeed: number = extractMeasurementFromDevice(device, "speed");
  const currentOutput: number = extractMeasurementFromDevice(device, "output");
  const currentAvailability: number = extractAnalyticsFromDevice(device, "availability");
  const currentPerformance: number = extractAnalyticsFromDevice(device, "performance");
  const maxSpeed: number = parseInt(get(device, "attributes.performanceData.maxSpeed.data", "0"), 10);
  const maxOutput: number = parseInt(get(device, "attributes.performanceData.maxOutput.data", "0"), 10);
  const targetSpeed: number = parseInt(get(device, "attributes.settings.targetSpeed.data", "0"), 10);
  const targetOutput: number = parseInt(get(device, "attributes.settings.targetOutput.data", "0"), 10);
  const targetPerformance: number = parseInt(get(device, "attributes.settings.targetPerformance.data", 0), 10);
  const speedPercentage: number = calculateProductivityPercentage(currentSpeed, maxSpeed);
  const outputPercentage: number = calculateProductivityPercentage(currentOutput, maxOutput);
  const speedTargetLevel: number = calculateProductivityPercentage(targetSpeed, maxSpeed);
  const outputTargetLevel: number = calculateProductivityPercentage(targetOutput, maxOutput);
  return {
    currentSpeed,
    currentOutput,
    currentAvailability,
    currentPerformance,
    maxSpeed,
    maxOutput,
    targetSpeed,
    targetOutput,
    targetPerformance,
    speedPercentage,
    outputPercentage,
    speedTargetLevel,
    outputTargetLevel,
  };
};
