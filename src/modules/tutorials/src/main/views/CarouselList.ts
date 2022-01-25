import * as h from "react-hyperscript";
import { css, cx } from "emotion";
import { Carousel, CarouselItem } from "react-onsenui";
import FormattedMessage from "../../../../../_common/i18n/components/Formatted_Message";
import { colors, fonts } from "../../../../../_common/styles/global";
import { TutorialsProps ,CarouselEvent} from "./Main";
const mainStyles = {

  welcome: css({
    "& span": fonts.mainTitle,
    marginTop: "35px",
    marginLeft: "33px",
    textAlign: "left",
    color: colors.teal

  }),
  slideText: css({
    "& span": fonts.welcomeTitle,
    maxwidth: "274px",
    marginLeft: "33px",
    marginRight: "33px",
    textAlign: "left",
    color: colors.atomic
  }),
  slideTextMargin: css({
    marginTop: "60px"
  }),
  phoneImg: css({
    height: "100%",
    margin: "auto",
    left: "0",
    right: "0",
    display: "block",
    position: "absolute",
  }),
  phoneImgDiv: css({
    position: "absolute",
    left: "0px",
    bottom: "100px",
    height: "55%",
    width: "100%",

  })
};

const CarouselList = ({ slideShow, actions }: TutorialsProps) =>
  (
    h(Carousel, {
      swipeable: true, fullscreen: true, autoScroll: true, overscrollable: true, index: slideShow.slideIndex,
      onPostChange: (e?: CarouselEvent) => { actions.onSwipeChange(e); },  onOverscroll: (e?: CarouselEvent) => { actions.onOversScroll(e);}
    },

      [
        h(CarouselItem, [
          h("div", { className: cx(mainStyles.welcome) }, [
            h(FormattedMessage, { id: "welcomeHeading", defaultMessage: "Welcome" })
          ]),
          h("div", { className: mainStyles.slideText },
            h(FormattedMessage, { id: "tutorials_slideShowTextOne", defaultMessage: "For now on you can easily reach our support,authenticate spare parts and keep track of your production" })
          ),
          h("div", {  className: mainStyles.phoneImgDiv }, [
            h("img", { className: mainStyles.phoneImg, src: "static/images/production.png"})
          ])
        ]),
        h(CarouselItem, [
          h("div", { className: cx(mainStyles.slideText, mainStyles.slideTextMargin) },
            h(FormattedMessage, { id: "tutorials_slideShowTextThree", defaultMessage: "...Verify your spare parts with a scan and order new parts directly ..." })
          ),
          h("div", {  className: mainStyles.phoneImgDiv }, [
            h("img", { className: mainStyles.phoneImg, src: "static/images/productionDetails.png"})
          ])
        ]),
        h(CarouselItem, [
          h("div", { className: cx(mainStyles.slideText, mainStyles.slideTextMargin) },
            h(FormattedMessage, { id: "tutorials_slideShowTextFour", defaultMessage: "...keep track of the production speed and efficiency of your machine" })
          ),
          h("div", {  className: mainStyles.phoneImgDiv }, [
            h("img", { className: mainStyles.phoneImg, src: "static/images/productionEdit.png"})
          ])
        ])
      ]

    )
  );


export default CarouselList;
