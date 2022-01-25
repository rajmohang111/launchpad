import { Paging, SelfLink } from "../../../../../_common/rest/models/rest";

export type MeasurementAttributes = {
  data: number | null,
  unit: string
};

export type MeasurementGroupPayload = {
  deviceId: string | number,
  speed: MeasurementAttributes,
  output: MeasurementAttributes,
  timestamp: string | Date,
};

export type MeasurementGroup = {
  type: "measurementgroups",
  id: string,
  attributes?: MeasurementGroupPayload,
  links: SelfLink,
};

export type MeasurementGroups = {
  data: ReadonlyArray<MeasurementGroup>,
  paging?: Paging
};
