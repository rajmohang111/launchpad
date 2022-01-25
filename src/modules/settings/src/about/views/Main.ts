import * as h from "react-hyperscript";
import { css } from "emotion";
import { List, ListItem, Page } from "react-onsenui";

import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { fonts } from "../../../../../_common/styles/global";
import CompanyImage from "./companyimage";
import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import {  simpleToolbarCreator } from "../../../../../_common/toolbar/factory";
import { createSettingsLeftElement } from "../../_common/toolbar";
import { aboutProductivityModuleName } from "../../../../../_common/i18n/message/translations";
import * as packageJson from "../../../../../../package.json";

export type AboutProps = {
  actions: ToolbarActions
};

const aboutStyles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    height: "90vh",
    justifyContent: "space-between"
  })
};



const Main = ({ actions }: AboutProps) => {
  const buildInfo = {
    version: packageJson.default.version,
    build: packageJson.default.build,
    date: packageJson.default.date
  };
  return h(Page, { renderToolbar:simpleToolbarCreator(aboutProductivityModuleName,
      createSettingsLeftElement(actions.onNavigateBack)
    )}, [
    h("div", { className: aboutStyles.container }, [
      h(List, [
        h(ListItem, { modifier: "nodivider", className: css(fonts.listItem) }, [
          h("div", { className: "left" }, [
            h(FormattedMessage, { id: "about_version" })
          ]),
          h("label", { className: "right" }, buildInfo.version)
        ]),
        h(ListItem, { modifier: "nodivider", className: css(fonts.listItem) }, [
          h("div", { className: "left" }, [
            h(FormattedMessage, { id: "about_build" })
          ]),
          h("label", { className: "right" }, buildInfo.build)
        ]),
        h(ListItem, { modifier: "nodivider", className: css(fonts.listItem) }, [
          h("div", { className: "left" }, [
            h(FormattedMessage, { id: "about_createdDate" })
          ]),
          h("label", { className: "right" }, buildInfo.date)
        ])
      ]),
      h(CompanyImage)
    ])
  ]);
};


export default Main;
