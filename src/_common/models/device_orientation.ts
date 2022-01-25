import {fromNullable} from "fp-ts/lib/Option";

export enum DEVICE_ORIENTATION {
  PORTRAIT = "PORTRAIT",
  LANDSCAPE = "LANDSCAPE",
}

export function readDeviceOrientation(window: Window): DEVICE_ORIENTATION {
  return fromNullable(window.orientation)
    .mapNullable<boolean>((orientation: number) => Math.abs(orientation) === 90)
    .mapNullable<DEVICE_ORIENTATION>(isLandscape => isLandscape ? DEVICE_ORIENTATION.LANDSCAPE : DEVICE_ORIENTATION.PORTRAIT)
    .getOrElse(DEVICE_ORIENTATION.PORTRAIT);
}
