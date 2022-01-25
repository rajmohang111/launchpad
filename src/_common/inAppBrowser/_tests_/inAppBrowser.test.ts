import { open } from "../inAppBrowser";
import { colors } from "../../styles/global";

describe("InAppBrowser", () => {
  describe("open", () => {

    const targeturl = "test.url";
    const target = "_blank";

    it("should call window open when cordova absent", () => {
      window.open = jest.fn();
      open(targeturl, "I Agree");
      expect(window.open).toBeCalledWith(targeturl, target);
    });

    it("should open inAppBrowser if cordova present", () => {
      window["cordova"] = ({ InAppBrowser: { open: jest.fn() } });
      open(targeturl, "I Agree");
      expect(window["cordova"].InAppBrowser.open)
        .toHaveBeenCalledWith(targeturl, target,
          `closebuttoncolor=${colors.teal},hideurlbar=yes,closebuttoncaption=I Agree`);
    });

    it("should open inAppBrowser should show done button", () => {
      window["cordova"] = ({ InAppBrowser: { open: jest.fn() } });
      open(targeturl, "Done");
      expect(window["cordova"].InAppBrowser.open)
        .toHaveBeenCalledWith(targeturl, target,
          `closebuttoncolor=${colors.teal},hideurlbar=yes,closebuttoncaption=Done`);
    });

  });
});
