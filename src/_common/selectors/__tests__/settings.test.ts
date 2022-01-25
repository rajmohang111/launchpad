import { createInitRootState, RootState } from "../../../main/reducers/main";
import { determineHost, getAccount, getAccountCredential, getAccountState, getSettings, isLoggedIn } from "../settings";
import { Credential } from "../../models/settings";
import { Region } from "../../models/system";
import { adamosHost, adamosHostChina, adamosHostDEV } from "../../rest/models/rest";

describe("Common settings selector", () => {

  const rootState = createInitRootState();
  describe("getSettings", () => {

    it("returns settings state", () => {

      expect(getSettings(rootState)).not.toBeUndefined();

    });

  });

  describe("getAccountState", () => {

    it("returns account state", () => {

      expect(getAccountState(rootState)).not.toBeUndefined();

    });

  });

  describe("getAccount", () => {

    it("returns account", () => {

      expect(getAccount(rootState)).not.toBeUndefined();

    });

  });

  describe("getAccountCredential", () => {

    it("returns blank credentials", () => {
      expect<Credential>(getAccountCredential(rootState)).toEqual({
        region: Region.OTHER,
        username: "",
        password: "",
      });
    });

    it("returns existing credentials", () => {
      const testState: RootState = {
        ...rootState,
        modules: {
          ...rootState.modules,
          settings: {
            ...rootState.modules.settings,
            account: {
              ...rootState.modules.settings.account,
              account: {
                ...rootState.modules.settings.account.account,
                credential: {
                  region: Region.OTHER,
                  username: "test.user@example.com",
                  password: "test.password#1234"
                }
              }
            }
          }
        }
      };
      expect<Credential>(getAccountCredential(testState)).toEqual({
        region: Region.OTHER,
        username: "test.user@example.com",
        password: "test.password#1234",
      });
    });

  });

  describe("isLoggedIn", () => {



    it("returns true in case credentials are set", () => {

      const stateWithAccount: RootState = {
        ...rootState,
        modules: {
          ...rootState.modules,
          settings: {
            ...rootState.modules.settings,
            account: {
              ...rootState.modules.settings.account,
              account: {
                ...rootState.modules.settings.account.account,
                credential: {
                  region: Region.OTHER,
                  username: "testUsername",
                  password: "testPassword"
                }
              }
            }
          }
        }
      };

      expect(isLoggedIn(stateWithAccount)).toBeTruthy();

    });

    it("returns false in case username is missing", () => {

      const stateWithMissingUserName: RootState = {
        ...rootState,
        modules: {
          ...rootState.modules,
          settings: {
            ...rootState.modules.settings,
            account: {
              ...rootState.modules.settings.account,
              account: {
                ...rootState.modules.settings.account.account,
                credential: {
                  region: Region.OTHER,
                  username: "",
                  password: "testPassword"
                }
              }
            }
          }
        }
      };

      expect(isLoggedIn(stateWithMissingUserName)).toBeFalsy();

    });

    it("returns false in case password is missing", () => {

      const stateWithMissingPassword: RootState = {
        ...rootState,
        modules: {
          ...rootState.modules,
          settings: {
            ...rootState.modules.settings,
            account: {
              ...rootState.modules.settings.account,
              account: {
                ...rootState.modules.settings.account.account,
                credential: {
                  region: Region.OTHER,
                  username: "testUser",
                  password: ""
                }
              }
            }
          }
        }
      };

      expect(isLoggedIn(stateWithMissingPassword)).toBeFalsy();

    });

  });

  describe("determineHost", () => {

    it("returns other host", () => {

      const hostExpected = adamosHost;

      const hostReturned = determineHost(Region.OTHER);

      expect(hostReturned).toEqual(hostExpected);

    });

    it("returns china host", () => {

      const hostExpected = adamosHostChina;

      const hostReturned = determineHost(Region.CHINA);

      expect(hostReturned).toEqual(hostExpected);

    });

    it("returns dev host", () => {

      const hostExpected = adamosHostDEV;

      const hostReturned = determineHost(Region.DEVELOPMENT);

      expect(hostReturned).toEqual(hostExpected);

    });

  });
  
});


