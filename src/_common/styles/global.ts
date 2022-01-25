import { CSSWideKeyword } from "react";

export const colors = {
  /* basic colors */
  teal:           "#008C7D",
  radicalRed:     "#FF2D55",
  atomic:         "#444F55",
  white:          "#FFFFFF",
  darkGray:       "#B0AFAF",
  veryLightGrey:  "#C8C8C8",
  aliceBlue:      "#ECEFF1",
  whiteSmoke:     "#F4F4F4",
  gainsboro:      "#DDDDDD",
  mischka:        "#A4AAB3",
  disabledGrey:   "#8F959A",
  dimGray:        "#646363",
  pelorous:       "#17a2b8",

  Gray90:         "#e5e5e5",
  gray90:         "#e5e5e5",
  gray50:         "rgba(229, 229, 229, .50)",
  teal15:         "rgba(  0, 141, 124, .15)",
  teal19:         "rgba(  0, 141, 124, .19)",
  teal25:         "rgba(  0, 141, 124, .25)",
  teal35:         "rgba(  0, 141, 124, .35)",
  teal40:         "rgba(  0, 141, 124, .40)",
  teal45:         "rgba(  0, 141, 124, .45)",
  teal55:         "rgba(  0, 141, 124, .55)",
  teal65:         "rgba(  0, 141, 124, .65)",
  teal75:         "rgba(  0, 141, 124, .75)",
  teal85:         "rgba(  0, 141, 124, .85)",
  teal95:         "rgba(  0, 141, 124, .95)",
  atomic15:       "rgba( 68,  79,  85, .15)",
  atomic25:       "rgba( 68,  79,  85, .25)",
  atomic35:       "rgba( 68,  79,  85, .35)",
  atomic45:       "rgba( 68,  79,  85, .45)",
  atomic55:       "rgba( 68,  79,  85, .55)",
  atomic65:       "rgba( 68,  79,  85, .65)",
  atomic75:       "rgba( 68,  79,  85, .75)",
  atomic85:       "rgba( 68,  79,  85, .85)",
  atomic95:       "rgba( 68,  79,  85, .95)",
  white25:        "rgba(255, 255, 255, .25)",
  white35:        "rgba(255, 255, 255, .35)",
  white45:        "rgba(255, 255, 255, .45)",
  white50:        "rgba(255, 255, 255, .50)",
  white55:        "rgba(255, 255, 255, .55)",
  white65:        "rgba(255, 255, 255, .65)",
  white75:        "rgba(255, 255, 255, .75)",
  white85:        "rgba(255, 255, 255, .85)",
  white88:        "rgba(255, 255, 255, .88)",
  white95:        "rgba(255, 255, 255, .95)",
  radicalRed15:   "rgba(255,  45,  85, .15)",
  radicalRed28:   "rgba(255,  45,  85, .28)",
  radicalRed35:   "rgba(255,  45,  85, .35)",
  radicalRed40:   "rgba(255,  45,  85, .40)",
  radicalRed45:   "rgba(255,  45,  85, .45)",
  radicalRed50:   "rgba(255,  45,  85, .50)",
  radicalRed55:   "rgba(255,  45,  85, .55)",
  radicalRed65:   "rgba(255,  45,  85, .65)",
  radicalRed75:   "rgba(255,  45,  85, .75)",
  radicalRed85:   "rgba(255,  45,  85, .85)",
};
export const fonts = {
  mainTitle: {
    fontFamily: "Roboto",
    fontSize: "44px",
    fontWeight: "500" as CSSWideKeyword,
    letterSpacing: "0.6px"
  },
  moduleTitle: {
    fontFamily: "Roboto",
    fontSize: "17px",
    fontWeight: "bold" as CSSWideKeyword,
    letterSpacing: "-0.5px"
  },
  moduleSelectLabel: {
    fontFamily: "Roboto",
    fontSize: "12px",
    fontWeight: "normal" as CSSWideKeyword,
    letterSpacing: "-0.5px"
  },
  informationTitle: {
    fontFamily: "Roboto",
    fontSize: "48px",
    fontWeight: "500" as CSSWideKeyword,
    letterSpacing: "0.2px"
  },
  buttonLabel: {
    fontFamily: "Roboto",
    fontSize: "17px",
    fontWeight: "normal" as CSSWideKeyword,
    letterSpacing: "-0.4px"
  },
  listItem: {
    fontFamily: "Roboto",
    fontSize: "17px",
    fontWeight: "500" as CSSWideKeyword,
    letterSpacing: "0.2px"
  },
  listHeader: {
    fontFamily: "Roboto",
    fontSize: "15px",
    fontWeight: "500" as CSSWideKeyword,
    letterSpacing: "0.2px"
  },
  checkBoxLabel: {
    fontFamily: "Roboto",
    fontSize: "15px",
    fontWeight: "normal",
    letterSpacing: "-0.4px",
    lineHeight: "18px"
  },
  fieldLabel: {
    fontFamily: "Roboto",
    fontSize: "11pt",
    fontWeight: "normal" as CSSWideKeyword,
    letterSpacing: "-0.3px",
    lineHeight: "13px"
  },
  fieldValue: {
    fontFamily: "Roboto",
    fontSize: "15px",
    fontWeight: "500" as CSSWideKeyword,
    letterSpacing: "-0.5px",
    lineHeight: "15px"
  },
  welcomeTitle:{
    fontFamily: "Roboto",
    fontSize: "17px",
    fontWeight: "500" as CSSWideKeyword,
    fontstretch: "normal",
    lineHeight: "normal",
    letterSpacing: "0.2px"
  },
  subTitle: {
    fontFamily: "Roboto",
    fontSize: "24px",
    fontWeight: "500" as CSSWideKeyword,
    letterSpacing: "0.6px"
  }
};

export const margins = {
  large: {
    top: "50px",
  },
  medium: {
    bottom: "20px",
    left: "20px",
    right: "20px"
  },
  small: {
    top: "10px",
    right: "10px",
    bottom: "10px",
    left: "10px",

  }
};

export const paddings = {
  small: {
    top: "10px",
    right: "10px",
    bottom: "10px",
    left: "10px",
  }
};

export const background = {
    mainGradient:"-moz-linear-gradient(50% 0% -90deg,rgba(220, 220, 220, 0.5) 0%,rgba(255, 255, 255, 1) 20%,rgba(130, 200, 189, 1) 100%);" +
    "background : -webkit-linear-gradient(-90deg, rgba(220, 220, 220, 0.5) 0%, rgba(255, 255, 255, 1) 20%, rgba(130, 200, 189, 1) 100%);" +
    "background : -webkit-gradient(linear,50% 0% ,50% 100% ,color-stop(0,rgba(220, 220, 220, 0.5) ),color-stop(0.2,rgba(255, 255, 255, 1) ),color-stop(1,rgba(130, 200, 189, 1) ));" +
    "background : -o-linear-gradient(-90deg, rgba(220, 220, 220, 0.5) 0%, rgba(255, 255, 255, 1) 20%, rgba(130, 200, 189, 1) 100%);" +
    "background : -ms-linear-gradient(-90deg, rgba(220, 220, 220, 0.5) 0%, rgba(255, 255, 255, 1) 20%, rgba(130, 200, 189, 1) 100%);" +
    "-ms-filter: \"progid:DXImageTransform.Microsoft.gradient(startColorstr='#DCDCDC', endColorstr='#82C8BD' ,GradientType=0)\";" +
    "background : linear-gradient(180deg, rgba(220, 220, 220, 0.5) 0%, rgba(255, 255, 255, 1) 20%, rgba(130, 200, 189, 1) 100%);" +
    "filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#DCDCDC',endColorstr='#82C8BD' , GradientType=0);"
};


