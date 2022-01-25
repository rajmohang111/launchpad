import * as h from "react-hyperscript";
import { Page, List, ListItem } from "react-onsenui";
import { css, cx } from "emotion";

import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import {  simpleToolbarCreator } from "../../../../../_common/toolbar/factory";
import { createSettingsLeftElement } from "../../_common/toolbar";
import { imprintModuleName } from "../../../../../_common/i18n/message/translations";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import Address from "./Address";
import ImprintField from "./ImprintField";
import { margins, fonts } from "../../../../../_common/styles/global";


export type ImprintViewProps = {
  actions: ToolbarActions
};

const imprintInfo = {
  name: "imprint_name",
  company: {
    streetName: "imprint_company_streetName",
    pinCode: "imprint_company_pincode",
    city: "imprint_company_city",
    country: "imprint_company_country"
  },
  directors: "imprint_directors",
  registerCourt: "imprint_register_court",
  registerNumber: "imprint_register_Number",
  vatNumber: "imprint_vat_Number",
  phone: "imprint_phoneNo",
  email: "imprint_emailAddress",
  responsibleForTreaty: {
    name: "imprint_responsibleForTreaty_name",
    co: "imprint_responsibleForTreaty_co",
    streetName: "imprint_responsibleForTreaty_streetName",
    country: "imprint_responsibleForTreaty_country",
    pinCode: "imprint_responsibleForTreaty_pincode",
    city: "imprint_responsibleForTreaty_city",
  }
};

const mainStyles = {
  margins: css({
    marginBottom: margins.medium.bottom
  }),
  listItem: css(fonts.listItem)
};

const ImprintView = ({ actions }: ImprintViewProps) =>
  h(Page,{ renderToolbar:simpleToolbarCreator(imprintModuleName,
    createSettingsLeftElement(actions.onNavigateBack)
  )}, [

    h(List, { className: mainStyles.margins, modifier: "noborder" }, [
      h(ListItem, { className: css(fonts.listItem), modifier: "nodivider" }, [
        h("div", { className: "left" }, [
          h(FormattedMessage, { id: imprintInfo.name })
        ]),
      ])
    ]),

    h(Address, { data: imprintInfo.company }),

    h(List, { className: mainStyles.margins, modifier: "noborder" }, [
      h(ImprintField, { field: imprintInfo.phone, fieldLabel: "imprint_phone" }),
      h(ImprintField, { field: imprintInfo.email, fieldLabel: "imprint_email" }),
    ]),

    h(List, { className: mainStyles.margins }, [
      h(ImprintField, { field: imprintInfo.directors, fieldLabel: "imprint_managingDirectorsRepresents" }),
      h(ImprintField, { field: imprintInfo.registerCourt, fieldLabel: "imprint_registerCourt" }),
      h(ImprintField, { field: imprintInfo.registerNumber, fieldLabel: "imprint_registerNumber" }),
      h(ImprintField, { field: imprintInfo.vatNumber, fieldLabel: "imprint_vatIdentificationNumber" }),
    ]),

    h(List, [
      h(ListItem, { modifier: "nodivider" }, [
        h("div", { className: cx("left", mainStyles.listItem) }, [
          h(FormattedMessage, { id: "imprint_treatyContent" })
        ])
      ])
    ]),
    h(Address, { data: imprintInfo.responsibleForTreaty }),
    h(List, [
      h(ListItem, [
        h("div", { className: cx("left", mainStyles.listItem) }, [
          h(FormattedMessage, { id: "imprint_legal_notice" })
        ])
      ])
    ])
  ]);

export default ImprintView;
