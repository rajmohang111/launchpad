import { ToolbarPart } from "../../../../../_common/toolbar/factory";
import { createSettingsLeftElement } from "../toolbar";

describe("Settings Toolbar", () => {

  describe("createSettingsLeftElement", () => {

    const onClick = jest.fn();

    it("returns left element for tool bar", () => {

      const leftElementExpected: ToolbarPart = {
        contentId: "",
        onClick
      };

      expect(createSettingsLeftElement(onClick)).toEqual(leftElementExpected);

    });

  });
});
