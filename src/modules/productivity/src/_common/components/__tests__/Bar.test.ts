import * as h from "react-hyperscript";
import { mount } from "enzyme";
import {BarComponent} from "../Bar";

describe("BarComponent", () => {

  describe("renders component", () => {

    it("renders with basic params", () => {
      const TestComponent = h(BarComponent, { fillLevel: 80, targetLevel: 75, content: "80%" });

      const wrapper = mount(TestComponent);
      expect(wrapper).not.toBeUndefined();
    });

    it("renders with different settings #1", () => {
      const TestComponent = h(BarComponent, { fillLevel: 60, targetLevel: 75, content: "60%" });

      const wrapper = mount(TestComponent);
      expect(wrapper).not.toBeUndefined();
    });

    it("renders with different settings #2", () => {
      const TestComponent = h(BarComponent, { fillLevel: 60, targetLevel: 75, content: "60%" });

      const wrapper = mount(TestComponent);
      expect(wrapper).not.toBeUndefined();
    });

    it("renders with different settings #3", () => {
      const TestComponent = h(BarComponent, { fillLevel: 25, targetLevel: 60, content: "25%", minAvailability: 80 });

      const wrapper = mount(TestComponent);
      expect(wrapper).not.toBeUndefined();
    });

    it("renders with different settings #4", () => {
      const TestComponent = h(BarComponent, { fillLevel: 50, targetLevel: 50, content: "50%", minAvailability: 80 });

      const wrapper = mount(TestComponent);
      expect(wrapper).not.toBeUndefined();
    });

  });

});
