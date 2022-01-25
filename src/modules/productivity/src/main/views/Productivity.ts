import * as h from "react-hyperscript";
import { Page } from "react-onsenui";
import { default as ProductivityOverview } from "../../overview/containers/Overview";
import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import { ProductivityRestService } from "../../_common/services/rest";
import { CustomPullHook } from "../../_common/components/CustomPullHook";
import ModuleMenu from "../../../../../_common/components/module_menu/components/ModuleMenu";
import OverviewHeader from "../../_common/components/OverviewHeader";

export type ProductivityActions = ToolbarActions & {
  fetchData(done: () => void, service: ProductivityRestService): void,
  onSwitcherChange: (toogleValue: boolean) => void,
};

export type ProductivityProps = {
  displayMetersPerHour: boolean,
  service: ProductivityRestService,
  actions: ProductivityActions,
};

const ProductivityView = ({ displayMetersPerHour, actions, service }: ProductivityProps) =>
  h(Page, {
    renderToolbar: () => h(OverviewHeader, { displayMetersPerHour, actions }),
    modifier: "productivity_page"
  }, [
      h(ModuleMenu, {
        component: () =>
          h("div", [
            h(CustomPullHook, { onLoad: (done: () => void) => actions.fetchData(done, service) }),
            h(ProductivityOverview)
          ])
      })
    ])
  ;

export default ProductivityView;
