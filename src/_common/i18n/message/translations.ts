import { fromNullable } from "fp-ts/lib/Option";
import en from "./en";
import de from "./de";
import zh from "./zh";
import { getLocale } from "../../locale/locale";

export const productivityModuleName = "productivityModuleName";
export const productivityDetailsModuleName = "productivityDetailsModuleName";
export const productivityEditModuleName = "productivityEditModuleName";
export const productivityChangeLimitModuleName = "productivityChangeLimitModuleName";
export const productivityselectMachinesModuleName = "productivityselectMachinesModuleName";
export const launchpadModuleName = "launchpadToolBarName";
export const settingsModuleName = "settingsModuleName";
export const tutorialModuleName = "tutorialModuleName";
export const preferencesModuleName = "preferencesModuleName";
export const aboutProductivityModuleName = "aboutProductivityModuleName";
export const registrationModuleName = "registrationModuleName";
export const accountModuleName = "accountModuleName";
export const imprintModuleName = "imprintModuleName";
export const loginModuleName = "loginModuleName";
export const saveButtonName = "saveButtonName";
export const cancelButtonName = "cancelButtonName";

export type Locale = string;
export type Translation = {
  locale: Locale,
  messages: Record<string, string>
};

const locales: Record<string, Translation> = {
  "en": en,
  "de": de,
  "zh": zh
};

const doLoad = (locale: Locale) =>
  fromNullable(Object.keys(locales).find(localeKey => locale.includes(localeKey)))
    .map((localeKey) => locales[localeKey]);

export const loadMessages = (locale?: Locale): Translation =>
  fromNullable(locale)
    .chain(locale => doLoad(locale))
    .getOrElse(en);

export const getDefaultTranslation = () =>
  loadMessages(getLocale())
  ;
