import * as React from "react";
import * as h from "react-hyperscript";

import { languages } from "../models/language";
import { Locale } from "../../../../../_common/i18n/IntlProvider";
import LaunchpadSelect, { LaunchpadSelectOptionDefinitions } from "../../../../../_common/components/LaunchpadSelect";

export type LanguageSelectorProps = {
  language: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
};

const createLaunchpadSelectOptionDefinitionsFromLocale = (locale: Locale): LaunchpadSelectOptionDefinitions => {

  const language = languages[locale];
  return {
    messageId: language.language,
    value: locale
  };
};
const createSelectOptionsMessageIds = (): Array<LaunchpadSelectOptionDefinitions> =>
  Object.keys(languages).map(createLaunchpadSelectOptionDefinitionsFromLocale);

const LanguageSelector = ({ language, handleChange }: LanguageSelectorProps) =>
  h(LaunchpadSelect, {
    selectOptions: createSelectOptionsMessageIds(),
    value: language,
    onChange: handleChange,
    name: "language",
    translatable:false

  });
export default LanguageSelector;
