export type I18NFixture = {
  formatMessage: jest.Mock;
};

export const createI18NFixture = (): I18NFixture => ({
  formatMessage: jest.fn()
});
