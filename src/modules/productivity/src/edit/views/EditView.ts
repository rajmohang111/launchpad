import * as h from "react-hyperscript";
import { Page, ProgressBar, Row, Col } from "react-onsenui";
import { css, cx } from "emotion";

import { completeToolbarCreator, createToolbarNavigationElement } from "../../../../../_common/toolbar/factory";
import { productivityChangeLimitModuleName, saveButtonName, cancelButtonName } from "../../../../../_common/i18n/message/translations";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import MachineInfo from "./MachineInfo";
import { fonts, colors } from "../../../../../_common/styles/global";
import { Device, SettingsAttributes } from "../../_common/models/device";
import { ToolbarActions } from "../../../../../_common/toolbar/Toolbar";
import ChangeLimits from "./ChangeLimits";
import { UpdateDeviceSettingsAction } from "../actions/edit_actions";
import { ProductivityRestService } from "../../_common/services/rest";
import LaunchpadToast from "../../../../../_common/components/launchpad_toast/components/LaunchpadToast";
import { maxValidityCheck, minValidityCheck } from "../services/services";

import { InjectedFormikProps, withFormik } from "formik";
import * as Yup from "yup";
import LaunchpadCheckbox from "../../../../../_common/components/LaunchpadCheckbox";

export type ProductivityEditActions = ToolbarActions & {
  onSave: (service: ProductivityRestService) => void;
  onChangeLimits: (settingsAttributes: SettingsAttributes) => UpdateDeviceSettingsAction;
  onSelectMachines: (deviceIds: Array<number>) => void;
};

export type ProductivityEditProps = {
  service: ProductivityRestService,
  device: Device,
  selectedDeviceIds: Array<number>,
  actions: ProductivityEditActions,
  loading: boolean;
};

const mainStyles = {
  fieldValue: css({
    color: colors.atomic,
    "& span": fonts.fieldValue
  }),
  inputForm: css({
    margin: "16px"
  }),
  mediumTopSpace: css({
    marginTop: "32px"
  }),
  smallTopSpace: css({
    marginTop: "16px"
  }),
  inputBox: css({
    width: "100%",
    display: "block"
  }),
  input: css({
    marginTop: "4px",
    width: "100%",
  }),
  select: css({
    paddingRight: "5%",
  }),
  marginCorrection: css({
    marginTop: "-16px"
  }),
  smallMarginLeft: css({
    marginLeft: "10px"
  })
};

type ProductivityView = {
  edit_setTargetPerformance?: number | null;
  edit_setTargetSpeed?: number | null;
  edit_setTargetOutput?: number | null;
};

const ProductivityEditView = (props: InjectedFormikProps<ProductivityEditProps, ProductivityView>) => {

  const { device, selectedDeviceIds, actions, loading, handleChange, submitForm, errors, touched } = props;
  return device ?
    h(Page, {
      renderToolbar: completeToolbarCreator(
        productivityChangeLimitModuleName,
        createToolbarNavigationElement(actions.onNavigateBack, cancelButtonName),
        createToolbarNavigationElement(() => submitForm(), saveButtonName),
      )
    }, [
        loading ? h(ProgressBar, { indeterminate: true }) : null,
        h(MachineInfo, { metadata: device.attributes.metaData }),
        h(ChangeLimits, {
          data: {
            settings: device.attributes.settings,
            performanceData: device.attributes.performanceData
          },
          actions,
          handleChange,
          errors,
          touched
        }),
        h("div", { className: cx(mainStyles.inputForm, mainStyles.marginCorrection) }, [
          h(Row, { className: mainStyles.input }, [
            h("div", { className: mainStyles.fieldValue }, [
              h(FormattedMessage, { id: "edit_validityOptions" })
            ])
          ]),
          h(Row, { className: cx(mainStyles.input, mainStyles.smallTopSpace, mainStyles.smallMarginLeft) }, [
            h(Col, { width: "10%" }, [
              h(LaunchpadCheckbox, {
                checked: selectedDeviceIds.length > 0,
                id: "checkbox-validForOtherMachine",
                onChange: () => actions.onSelectMachines(selectedDeviceIds)
              })
            ]),
            h(Col, { width: "90%" }, [
              h("label", { className: cx("center", mainStyles.fieldValue), htmlFor: "checkbox-validForOtherMachine" }, [
                h(FormattedMessage, { id: "edit_validForOtherMachines" })
              ])
            ])
          ])
        ]),
        h(LaunchpadToast)
      ]) : null;
};

const initProductivityEditView = (device: Device): ProductivityView => ({
  edit_setTargetPerformance: device ? device.attributes.settings!.targetPerformance!.data : undefined,
  edit_setTargetSpeed: device ? device.attributes.settings!.targetSpeed!.data : undefined,
  edit_setTargetOutput: device ? device.attributes.settings!.targetOutput!.data : undefined
});

const EditView = withFormik<ProductivityEditProps, ProductivityView>({
  mapPropsToValues: props => initProductivityEditView(props.device),
  validationSchema: (props: any) => Yup.object().shape({
    edit_setTargetPerformance: Yup.string()
      .matches(/^([0]([.][0-9]+)?|[1-9]([0-9]+)?([.][0-9]+)?)$/, "edit_valid_min_performance")
      .test("_min", "edit_valid_min_performance_min", val => minValidityCheck(val, 0))
      .test("_max", "edit_valid_min_performance_max", val => maxValidityCheck(val, 100)),
    edit_setTargetSpeed: Yup.string()
      .matches(/^([0]([.][0-9]+)?|[1-9]([0-9]+)?([.][0-9]+)?)$/, "edit_valid_target_speed")
      .test("_min", "edit_valid_target_speed_min", val => minValidityCheck(val, 0))
      .test("_max", "edit_valid_target_speed_max", val => maxValidityCheck(val, props.device.attributes.performanceData.maxSpeed.data)),
    edit_setTargetOutput: Yup.string()
      .matches(/^([0]([.][0-9]+)?|[1-9]([0-9]+)?([.][0-9]+)?)$/, "edit_valid_target_output")
      .test("_min", "edit_valid_target_output_min", val =>  minValidityCheck(val, 0))
      .test("_max", "edit_valid_target_output_max", val => maxValidityCheck(val, props.device.attributes.performanceData.maxOutput.data))

  }),
  handleSubmit: (values, bag) => {
    bag.props.actions.onSave(bag.props.service);
  }
})(ProductivityEditView);


export default EditView;
