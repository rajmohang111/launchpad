import { ListItem } from "react-onsenui";
import * as h from "react-hyperscript";
import { css } from "emotion";

import { fonts } from "../../../../../_common/styles/global";
import { I18N } from "../../../../../_common/i18n/components/I18N";
import { I18NContext } from "../../../../../_common/i18n/IntlProvider";

export type ImprintFieldProps = {
  field?: string;
  fieldLabel: string;
};

const ImprintField = ({ field, fieldLabel }: ImprintFieldProps) =>
  field ?
    h(I18N, {
      component: (i18N: I18NContext) =>
        h(ListItem, { className: css(fonts.listItem), modifier: "nodivider" }, [
          h("div", { className: "left" }, `${i18N.intl.formatMessage(fieldLabel)} : ${i18N.intl.formatMessage(field)}`),
        ])
    }) : null;

export default ImprintField;
