import {MeasurementAttributes} from "./measurements";
import { RelatedLink, SelfLink } from "../../../../../_common/rest/models/rest";

export {MeasurementAttributes};

export type TimeRange = {
  start: string | Date,
  end: string | Date,
};

export type AnalyticsAttributes = {
  data: number | string,
  unit: string
};

export type AnalyticsPayload = {
  deviceId: string | number,
  availability?: AnalyticsAttributes,
  performance?: AnalyticsAttributes,
  timeRange?: TimeRange,
};

export type Analytics = {
  type: "analytics",
  id: string,
  attributes: AnalyticsPayload,
  links?: SelfLink,
};

export type BaseMeasurementPayload = {
  deviceId: string | number,
  type?: string,
  data?: string | number,
  unit?: string,
  timestamp?: string | Date,
};

export type MeasurementPayload = BaseMeasurementPayload & {
  productionSpeed?: MeasurementAttributes,
  output?: MeasurementAttributes,
  availability?: MeasurementAttributes,
  performance?: MeasurementAttributes,
};

export type Measurement = {
  type: "measurements",
  id: string,
  attributes: MeasurementPayload,
  links?: SelfLink,
};

export type SettingsAttributes = {
  targetSpeed?: MeasurementAttributes,
  targetOutput?: MeasurementAttributes,
  targetPerformance?: MeasurementAttributes,
};

export type PerformanceDataAttributes = {
  maxSpeed: MeasurementAttributes,
  maxOutput: MeasurementAttributes
};

export type MetadataAttributes = {
  code: string,
  number: string,
  name: string,
};

export type MeasurementRelationship = {
  links?: RelatedLink,
  data: Array<Measurement>,
};

export type AnalyticsRelationship = {
  links?: RelatedLink,
  data: Array<Analytics>,
};

export type Relationships = {
  measurements?: MeasurementRelationship,
  analytics?: AnalyticsRelationship,
};

export type Device = {
  type: string,
  id: number,
  attributes: {
    metaData?: MetadataAttributes,
    performanceData?: PerformanceDataAttributes,
    settings?: SettingsAttributes,
  },
  relationships?: Relationships,
  links?: SelfLink,
  measurementWarnings?: string[]
};

export type DevicesResponse = {
  data: Array<Device>,
  included?: Array<MeasurementRelationship | AnalyticsRelationship>,
};

export type DeviceResponse = {
  data: Device,
};
