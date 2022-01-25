import {Region} from "../../models/system";

export type Credential = {
  region: Region,
  username: string,
  password: string
};

export type SelfLink = {
  self: string
};

export type RelatedLink = {
  related: string,
};

export type Paging = {
  cursors: {
    after: string,
    before: string,
    current: string,
  }
};

export type Data = {
  type: string,
  id: string
};

export const technicalUser: Credential = {
  region: Region.DEVELOPMENT,
  username: "launch_pad_asms_user",
  password: "KM2018!#ms"
};


export const adamosHost = process.env.ADAMOS_HOST || "https://karlmayer.adamos.com";
export const adamosHostChina = process.env.ADAMOS_HOST_CHINA || "https://karlmayer.adamos.cn";
export const adamosHostDEV = process.env.ADAMOS_HOST_DEV || "https://karlmayer.adamos-dev.com";
export const launchpadUrl = (host: string) => `${host}/service/launchpad`;
