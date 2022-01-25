import * as React from "react";
import * as h from "react-hyperscript";
import { I18N } from "../i18n/components/I18N";
import { I18NContext } from "../i18n/IntlProvider";
import { css } from "emotion";

export const emptySelectionMessageId = "launchpad_select_empty_option";

export type LaunchpadSelectOptionDefinitions = {
  messageId: string,
  value: string
};
export type LaunchpadSelectProps = {
  selectOptions: Array<LaunchpadSelectOptionDefinitions>,
  value: string | undefined,
  onChange: (e: React.ChangeEvent<HTMLElement>) => void,
  name: string,
  translatable:boolean
};

const styles = {
  container: css({
    padding: "0",
    width: "100%",
    "& select": css({
      WebkitTransform: "none"
    })
  })
};

const createSelectOption = (i18N: I18NContext,translatable:boolean) => (definition: LaunchpadSelectOptionDefinitions) =>
    h("option", { value: definition.value }, [
      translatable?  i18N.intl.formatMessage(definition.messageId) : definition.messageId
 ]);
const withEmptySelection = (value: string | undefined) => !value;
const LaunchpadSelect = (props: LaunchpadSelectProps) =>
  h(I18N, { component: (i18N: I18NContext) =>
      h("div", { className: styles.container }, [
        h("select",
          { className: "select-input select-input--material", value: withEmptySelection(props.value) ? "" : props.value, onChange: props.onChange, name: props.name },
          withEmptySelection(props.value) ?
            [
              h("option", { disabled: true, value: "" }, [
                i18N.intl.formatMessage(emptySelectionMessageId)
              ]),
              ...props.selectOptions.map(createSelectOption(i18N, props.translatable))
            ] :
            props.selectOptions.map(createSelectOption(i18N, props.translatable))
      )])
  });

export default LaunchpadSelect;
