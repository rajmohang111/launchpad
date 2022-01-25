import * as h from "react-hyperscript";
import { css } from "emotion";
import { ListItem, List } from "react-onsenui";

import { Address } from "../models/address";
import { fonts, margins } from "../../../../../_common/styles/global";
import { I18N } from "../../../../../_common/i18n/components/I18N";
import { I18NContext } from "../../../../../_common/i18n/IntlProvider";


export type AddressProps = {
  data: Address
};

const mainStyles = {
  margins: css({
    marginBottom: margins.medium.bottom
  })
};

const Address = ({ data }: AddressProps) =>
  h(I18N, {
    component: (i18N: I18NContext) =>
      h(List, { className: mainStyles.margins, modifier: "noborder" }, [
        data.name ? h(ListItem, { className: css(fonts.listItem), modifier: "nodivider" }, [
          h("div", { className: "left" }, `${i18N.intl.formatMessage(data.name)}`),
        ]) : "",
        data.co ? h(ListItem, { className: css(fonts.listItem), modifier: "nodivider" }, [
          h("div", { className: "left" }, `${i18N.intl.formatMessage("imprint_care_of")} ${i18N.intl.formatMessage(data.co)}`),
        ]) : "",
        h(ListItem, { className: css(fonts.listItem), modifier: "nodivider" }, [
          h("div", { className: "left" }, `${i18N.intl.formatMessage(data.streetName)}`),
        ]),
        h(ListItem, { className: css(fonts.listItem), modifier: "nodivider" }, [
          h("div", { className: "left" }, `${i18N.intl.formatMessage(data.pinCode)} ${i18N.intl.formatMessage(data.city)}`),
        ]),
        h(ListItem, { className: css(fonts.listItem), modifier: "nodivider" }, [
          h("div", { className: "left" }, `${i18N.intl.formatMessage(data.country)}`),
        ])
      ])
  });

export default Address;
