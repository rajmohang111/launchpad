import * as h from "react-hyperscript";
import { SettingsAttributes, PerformanceDataAttributes } from "../../_common/models/device";
import SelectRange from "./SelectRange";
import { SettingsAttributeName } from "../actions/edit_actions";
import {css} from "emotion";
import { ChangeEvent } from "react";
import { FormikErrors , FormikTouched} from "formik";

export type ChangeLimitsProps = {
    data: {
        settings?: SettingsAttributes,
        performanceData?: PerformanceDataAttributes
    },
    actions: {
        onChangeLimits: (settingsAttributes: SettingsAttributes) => void;
    },
    handleChange: (event: ChangeEvent<any>) => void;
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
    
};

const mainStyles = {
  itemDiv: css({
    padding: "16px",
  })
};

const ChangeLimits = ({ data, actions , handleChange , errors, touched}: ChangeLimitsProps) =>
    data.settings && data.performanceData ?
        h("div", { className: mainStyles.itemDiv }, [
          data.settings.targetPerformance?
            h(SelectRange, {
                data: {
                    id: SettingsAttributeName.targetPerformance,
                    labelId: "edit_setTargetPerformance",
                    values: data.settings.targetPerformance,
                    max: 100
                },
                actions,
                handleChange,
                errors,
                touched
            })
            : null,
            h(SelectRange, {
                data: {
                    id: SettingsAttributeName.targetSpeed,
                    labelId: "edit_setTargetSpeed",
                    values: data.settings.targetSpeed,
                    max: data.performanceData.maxSpeed.data
                },
                actions,
                handleChange,
                errors,
                touched
            }),
            h(SelectRange, {
                data: {
                    id: SettingsAttributeName.targetOutput,
                    labelId: "edit_setTargetOutput",
                    values: data.settings.targetOutput,
                    max: data.performanceData.maxOutput.data
                },
                actions,
                handleChange,
                errors,
                touched
            }),
        ]) : null;

export default ChangeLimits;
