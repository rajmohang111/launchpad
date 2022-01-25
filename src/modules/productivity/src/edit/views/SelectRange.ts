import * as h from "react-hyperscript";
import { MeasurementAttributes, SettingsAttributes } from "../../_common/models/device";
import Ranges from "./Ranges";
import { SettingsAttributeName } from "../actions/edit_actions";
import { ChangeEvent } from "react";
import { FormikErrors , FormikTouched} from "formik";

export type SelectRangeProps = {
  data: {
    id: SettingsAttributeName;
    labelId: string;
    values: MeasurementAttributes
    max: number;
  }
  actions: {
    onChangeLimits: (settingsAttributes: SettingsAttributes) => void;
  },
  handleChange: (event: ChangeEvent<any>) => void;
  errors:FormikErrors<any>;
  touched:FormikTouched<any>;
};

const SelectRange = ({ data, actions ,handleChange ,errors ,touched }: SelectRangeProps) =>
h(Ranges, {
  data: {
    id: data.id,
    labelId: data.labelId,
    unit: data.values.unit,
    value: data.values!.data!.toString(),
    max: data.max
  },
  actions,
  handleChange,
  errors,
  touched
});

export default SelectRange;
