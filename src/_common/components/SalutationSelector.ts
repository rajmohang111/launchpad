import * as h from "react-hyperscript";
import { ChangeEvent } from "react";
import { Salutation } from "../models/settings";
import LaunchpadSelect, { LaunchpadSelectOptionDefinitions } from "./LaunchpadSelect";


export type SalutationSelectorProps = {
  value: string | undefined,
  actions: {
    onChange: (event: ChangeEvent<any>) => void;
  }
};

const createSelectOptions = (): Array<LaunchpadSelectOptionDefinitions> =>
  Object.keys(Salutation).map((key: string): LaunchpadSelectOptionDefinitions => ({
    messageId: Salutation[key],
    value: Salutation[key]
  }));
const SalutationSelector = ({ value, actions }: SalutationSelectorProps) =>
  h(LaunchpadSelect, { selectOptions: createSelectOptions(), value, onChange: actions.onChange, name: "salutation" ,translatable: true });

export default SalutationSelector;
