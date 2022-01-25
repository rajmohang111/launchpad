import * as h from "react-hyperscript";
import { ChangeEvent } from "react";
import LaunchpadSelect, { LaunchpadSelectOptionDefinitions } from "./LaunchpadSelect";
import { Region } from "../models/system";
import { curry } from "ramda";
import { fromNullable } from "fp-ts/lib/Option";

export const isProduction = fromNullable(process.env.IS_PRODUCTION).map(Boolean).getOrElse(true);


export type RegionSelectorProps = {
  value: string | undefined,
  isProduction: boolean,
  actions: {
    onChange: (event: ChangeEvent<any>) => void;
  }
};

export const shouldIncludeRegion = (isProduction: boolean, region: string) => !isProduction || (Region[region] !== Region.DEVELOPMENT && Region[region] !== Region.CHINA);
export const createSelectOptions = (isProduction: boolean): Array<LaunchpadSelectOptionDefinitions> =>
  Object.keys(Region).filter(curry(shouldIncludeRegion)(isProduction)).map((key: string): LaunchpadSelectOptionDefinitions => ({
    messageId: Region[key],
    value: Region[key]
  }));
const RegionSelector = ({ value, actions, isProduction }: RegionSelectorProps) =>
  h(LaunchpadSelect, { selectOptions: createSelectOptions(isProduction), value, onChange: actions.onChange, name: "region", translatable: true });

export default RegionSelector;
