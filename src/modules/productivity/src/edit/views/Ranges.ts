import * as h from "react-hyperscript";
import { css } from "emotion";

import { fonts, colors } from "../../../../../_common/styles/global";
import { SettingsAttributeName } from "../actions/edit_actions";
import { SettingsAttributes } from "../../_common/models/device";
import { Row } from "react-onsenui";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { getRangeValue, getUnitLabel } from "../services/services";
import { ChangeEvent } from "react";
import FormErrorMessages from "../../../../../_common/components/FormErrorMessages";
import { FormikErrors, FormikTouched } from "formik";
import { I18N } from "../../../../../_common/i18n/components/I18N";
import { I18NContext } from "../../../../../_common/i18n/IntlProvider";
import LaunchpadInput from "../../../../../_common/components/LaunchpadInput";

export type RangesProps = {
  data: {
    id: SettingsAttributeName;
    labelId: string;
    unit: string;
    value: string;
    max: number;
  }
  actions: {
    onChangeLimits: (settingsAttributes: SettingsAttributes) => void;
  },
  handleChange: (event: ChangeEvent<any>) => void;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
};

const mainStyles = {
  barContainer: css({
    float: "left",
    height: "10px",
    width: "100%",
    marginTop: "4px",
    backgroundColor: colors.teal19,
    borderRadius: "5px",
    position: "relative",
  }),
  bar: css({
    float: "left",
    backgroundColor: colors.teal,
    borderRadius: "5px",
    height: "10px"
  }),
  input: css({
    marginTop: "4px",
    width: "100%",
  }),
  barRow: css({
    marginBottom: "12px",
  }),
  inputRow: css({
    marginBottom: "22px",
  }),
};

export function getBarLabel(labelId: string) {
  switch (true) {
    case labelId === "edit_setTargetPerformance": {
      return "edit_MaxPerformance";
    }
    case labelId === "edit_setTargetSpeed": {
      return "edit_MaxTargetSpeed";
    }
    case labelId === "edit_setTargetOutput": {
      return "edit_MaxOutput";
    }
    default: {
      return labelId;
    }
  }
}

const Ranges = ({ data, actions, handleChange, errors, touched }: RangesProps) =>
  h(I18N, {
    component: (i18N: I18NContext) =>
      h(Row, [
        h(Row, { className: mainStyles.barRow }, [
          h("label", { className: fonts.fieldLabel }, [
            h("span", `${i18N.intl.formatMessage(data.labelId)}`),
            h("span", [` [${i18N.intl.formatMessage(getUnitLabel(data.unit))}] `])
          ]),
          h("div", {
            className: mainStyles.barContainer
          }, [
              h("div", {
                className: mainStyles.bar,
                style: { "width": `${getRangeValue(parseInt(data.value, 10), data.max)}%` }
              }),
            ]),
        ]),
        h(Row, { className: mainStyles.inputRow }, [
          h("label", { className: fonts.fieldLabel }, [
            h(FormattedMessage, { id: getBarLabel(data.labelId) }),
            h("span", [` ${data.max}`]),
            h("span", [` ${i18N.intl.formatMessage(getUnitLabel(data.unit))}`])
          ]),
          h(LaunchpadInput, {
            className: mainStyles.input,
            onChange: (event: any) => {
              actions.onChangeLimits({
                [data.id]: {
                  unit: data.unit,
                  data: event.target.value > data.max ? data.max : event.target.value
                }
              } as SettingsAttributes);
              handleChange(event);
            },
            name: data.labelId,
            value: data.value,
            type: "number"
          }),
          h(FormErrorMessages, { error: errors[data.labelId], messageId: errors[data.labelId], touched: touched[data.labelId] })
        ]),
      ])
  });

export default Ranges;
