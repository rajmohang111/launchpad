import { Locale } from "../../../../../_common/i18n/IntlProvider";

export const ACTION_UPDATE_LANGUAGE_PREFERENCES = "ACTION_UPDATE_LANGUAGE_PREFERENCE";
export const ACTION_UPDATE_SHOW_TUTORIALS_PREFERENCES = "ACTION_UPDATE_SHOW_TUTORIALS_PREFERENCES";

export type Language = {
  language: string,
  locale: Locale
};
export const languages: Record<Locale, Language> = {
  [Locale.en]: { language: "English", locale: Locale.en },
  [Locale.de]: { language: "Deutsch", locale: Locale.de },
  [Locale.zh]: { language: "中国", locale: Locale.zh },
};
