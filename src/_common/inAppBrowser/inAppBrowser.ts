import { colors } from "../styles/global";

const target = "_blank";

export const open = (url: string, closeActionText: string) => {
  window["cordova"] ?
    window["cordova"].InAppBrowser.open(url, target,
      `closebuttoncolor=${colors.teal},hideurlbar=yes,closebuttoncaption=${closeActionText}`) :
    window.open(url, target);
};

