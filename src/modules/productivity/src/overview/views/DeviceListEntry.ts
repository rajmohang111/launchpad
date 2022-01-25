import * as h from "react-hyperscript";
import { Icon, ListItem } from "react-onsenui";
import { css, cx } from "emotion";
import { colors, fonts } from "../../../../../_common/styles/global";
import { Device } from "../../_common/models/device";
import { getCalculatedValuesForDevice } from "../services/overview_services";
import { getBarComponentHelper } from "../../_common/components/Bar";
import { I18N } from "../../../../../_common/i18n/components/I18N";
import { I18NContext } from "../../../../../_common/i18n/IntlProvider";
import { includes } from "lodash";

const mainStyles = {
  listItem: css({
    padding: "0 15px",
  }),
  col1: css({
    display: "flex",
    flex: "1 1 25%",
    overflow: "hidden",
    "& span": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      display: "block",
      textOverflow: "ellipsis",
    }
  }),
  col2: css({
    display: "flex",
    flex: "1 1 50%",
    overflow: "hidden",
    justifyContent: "center",
  }),
  col3: css({
    display: "flex",
    flex: "1 1 25%",
    overflow: "hidden",
    justifyContent: "flex-end",
  }),
  deviceIcon: css({
    paddingRight: "10px",
    color: colors.teal,
    "& span": fonts.listItem
  }),
  deviceIconCritical: css({
    color: "rgba(255, 45, 85, 1)",
  }),
  deviceIconOutdated: css({
    color: colors.disabledGrey,
  })
};

export type DeviceListEntryProps = {
  displayMetersPerHour: boolean,
  device: Device,
  actions: {
    onDeviceSelect: (data: Device) => void
  },
};

export type PercentageColorProps = {
  outdated: boolean;
  fillLevel: number,
  targetLevel: number,
  targetPerformance?: number,
};

function getPercentageColor({ outdated, fillLevel, targetLevel, targetPerformance = 0 }: PercentageColorProps): string {
  const css = mainStyles.deviceIcon;
  const critical = mainStyles.deviceIconCritical;
  switch (true) {
    case outdated: {
      return cx(css, mainStyles.deviceIconOutdated);
    }
    case fillLevel === 0: {
      return cx(css, critical);
    }
    case fillLevel < Math.min(targetLevel, 100): {
      return cx(css, critical);
    }
    case fillLevel < Math.min(targetPerformance, 100): {
      return cx(css, critical);
    }
    default: {
      return css;
    }
  }
}

export const DeviceListEntry = ({ device, displayMetersPerHour, actions }: DeviceListEntryProps) => {
  const calc = getCalculatedValuesForDevice(device);
  return h(ListItem, {
    modifier: "longdivider",
    className: mainStyles.listItem,
    onClick: () => actions.onDeviceSelect(device)
  }, [
      h("div", { className: mainStyles.col1 }, [
        h(I18N, {
          component: (i18N: I18NContext) =>
            h("span", device.attributes.metaData ? device.attributes.metaData.name : i18N.intl.formatMessage("unnamed"))
        })
      ]),
      h("div", { className: mainStyles.col2 }, [
        getBarComponentHelper({ device, displayMetersPerHour })
      ]),
      h("div", { className: mainStyles.col3 }, [
        h("div", {
          className: getPercentageColor({
            outdated: device.measurementWarnings ? includes(device.measurementWarnings, "PERFORMANCE_MEASUREMENT_OUTDATED") : false,
            fillLevel: calc.currentPerformance,
            targetLevel: calc.targetPerformance,
          })
        }, [
            h("span", `${calc.currentPerformance}%`)
          ]),
        h(Icon, { icon: "md-chevron-right" })
      ])
    ]);
};

export default DeviceListEntry;
