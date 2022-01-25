import { fromNullable } from "fp-ts/lib/Option";

export const getLocale = () => fromNullable(navigator)
  .map(() => navigator.language)
  .getOrElse("en_US");
