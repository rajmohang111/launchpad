import {DEVICE_ORIENTATION, readDeviceOrientation} from "../device_orientation";

describe("device_orientation", () => {

  describe("readDeviceOrientation", () => {

    describe(`orientation: ${DEVICE_ORIENTATION.PORTRAIT}`, () => {

      it(`should return ${DEVICE_ORIENTATION.PORTRAIT} for orientation = 0`, () => {
        const window = {
          orientation: 0
        } as Window;
        const orientation: DEVICE_ORIENTATION = readDeviceOrientation(window);
        expect(orientation).toEqual(DEVICE_ORIENTATION.PORTRAIT);
      });

      it(`should return ${DEVICE_ORIENTATION.PORTRAIT} for orientation = 180`, () => {
        const window = {
          orientation: 180
        } as Window;
        const orientation: DEVICE_ORIENTATION = readDeviceOrientation(window);
        expect(orientation).toEqual(DEVICE_ORIENTATION.PORTRAIT);
      });

    });

    describe(`orientation: ${DEVICE_ORIENTATION.LANDSCAPE}`, () => {

      it(`should return ${DEVICE_ORIENTATION.LANDSCAPE} for orientation = 90`, () => {
        const window = {
          orientation: 90
        } as Window;
        const orientation: DEVICE_ORIENTATION = readDeviceOrientation(window);
        expect(orientation).toEqual(DEVICE_ORIENTATION.LANDSCAPE);
      });

      it(`should return ${DEVICE_ORIENTATION.LANDSCAPE} for orientation = -90`, () => {
        const window = {
          orientation: -90
        } as Window;
        const orientation: DEVICE_ORIENTATION = readDeviceOrientation(window);
        expect(orientation).toEqual(DEVICE_ORIENTATION.LANDSCAPE);
      });

    });

  });

});
