import { Language, Preference } from "../../../models/settings";

export type SharedAccountRestServiceFixture = {
  loadAccountFromHost: jest.Mock,
  loadAccount: jest.Mock;
  createAccount: jest.Mock;
  resetPassword: jest.Mock;
};
export const createSharedAccountRestServiceFixture = (): SharedAccountRestServiceFixture => ({
  loadAccountFromHost: jest.fn(),
  loadAccount: jest.fn(),
  createAccount: jest.fn(),
  resetPassword: jest.fn()
});

export const createPreferenceFixture = (): Preference => ({
  language: Language.en,
  hideTutorial: false
});
