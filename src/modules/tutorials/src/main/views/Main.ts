import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import { tutorialState } from "../reducers/tutorial";
import { Icon, Page } from "react-onsenui";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";


import { colors, background } from "../../../../../_common/styles/global";
import CarouselList from "./CarouselList";

import { PreferenceDeviceStore } from "../../../../settings/src/preferences/services/device_store";

import { DeviceStoreContext } from "../../../../../_common/storage/components/DeviceStoreProvider";
import { PreferencesState } from "../../../../settings/src/preferences/reducers/preferences";
import { DeviceStore } from "../../../../../_common/storage/components/DeviceStore";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../../../main/reducers/main";
import { TutorialActions } from "../actions/tutorial";
import { Preference } from "../../../../../_common/models/settings";
import LaunchpadCheckbox from "../../../../../_common/components/LaunchpadCheckbox";

export type CarouselEvent = {
  type: string,
  activeIndex: number,
};


export type TutorialsProps = {
  slideShow: tutorialState;
  preferencesState: PreferencesState;
  actions: {
    onSlideChange: (index: number) => void;
    onSwipeChange: (event?: CarouselEvent) => void;
    onhideSlide: () => void;
    onShowTutorialUpdate: (preference: Preference, hideTutorial: boolean, preferenceDeviceStore: PreferenceDeviceStore) => ThunkAction<void, RootState, void, TutorialActions>;
    onOversScroll: (event?: CarouselEvent ) => void;
  }
};

const mainStyles = {
  slide: css({
    height: "100%",
    background : background.mainGradient
  }),
  dots: css({
    textAlign: "center",
    fontSize: "15px",
    position: "absolute",
    bottom: "20px",
    color: colors.teal,
    left: 0,
    right: 0,
    padding: "2px",
    display: "inline"
  }),
  dontShow: css({
    fontSize: "15px",
    width: "100%",
    position: "absolute",
    bottom: "50px",
    backgroundColor: colors.white75,
  }),
  dot: css({
    padding: "5px",
    color: colors.veryLightGrey
  }),
  dotActive: css({
    padding: "5px",
    color: colors.teal
  }),

  closebtn: css({
    textAlign: "center",
    fontSize: "20px",
    position: "absolute",
    color: colors.atomic,
    top: "35.2px",
    right: "33.2px",
    zIndex: 999
  }),
  dontShowContent: css({
    display: "flex",
    padding: "10px",
    justifyContent: "center"
  }),
  dontShowMessage: css({
    marginLeft: "30px"
  }),
};




const dotArray = [0, 1, 2];
const Main = ({ slideShow, preferencesState, actions }: TutorialsProps) =>

  h(Page, [
    h("div", { className: mainStyles.slide }, [
      h("div", {
        className: mainStyles.closebtn,
        onClick: () => actions.onhideSlide()
      }, [
          h(Icon, { icon: ("ion-close"), size: 24 })
        ]),

      h(CarouselList, { slideShow, actions }),


      h("div", { className: mainStyles.dontShow }, [
        h("div", { className: cx("center", mainStyles.dontShowContent) }, [
          h("div", [
            h(DeviceStore, {
              component: (storeContext: DeviceStoreContext) =>
                h(LaunchpadCheckbox, {
                  id: "checkbox-dontShowTutorial",
                  checked: preferencesState.hideTutorial,
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => actions.onShowTutorialUpdate(preferencesState, event.target.checked, storeContext.deviceStores.settingsDeviceStores.preferenceDeviceStores.preferenceDeviceStore)
                })
            })
          ]),
          h("label", { className: mainStyles.dontShowMessage, htmlFor: "checkbox-dontShowTutorial" }, [
            h(FormattedMessage, { id: "tutorials_dontShowLabel" })
          ])
        ])
      ]),


      h("div", {
        className: mainStyles.dots,
      },
        dotArray.map(index => {
          return h("label", {
            className: slideShow.slideIndex === index ? mainStyles.dotActive : mainStyles.dot,
            onClick: () => actions.onSlideChange(index)
          }, [
              h(Icon, { icon: ("fa-circle"), size: 15 })
            ]);
        })
      )
    ])

  ]);

export default Main;
