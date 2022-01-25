import { ErrorType, LaunchPadError } from "../error/error";
import {Region} from "./system";

export enum Salutation {
  MR = "salutation_mr",
  MS = "salutation_ms"
}

export const salutationFromString = (salutation: string): Salutation => {
  switch (salutation) {
    case Salutation.MR:
      return Salutation.MR;
      case Salutation.MS:
      return Salutation.MS;
    default:
      throw new LaunchPadError("Salutation parsing", ErrorType.internalError);
  }
};

export type NewCredential = {
  username: string,
  region: Region
};

export type NewAccount = {
  person: Person,
  contact: Contact,
  credential: NewCredential,
  metadata: Metadata
};

export type Account = {
  person: Person,
  contact: Contact,
  credential: Credential,
  metadata: Metadata
};

export type Person = {
  customerNumber: string,
  salutation: Salutation,
  firstName: string
  lastName: string,
};

export type Contact = {
  eMail: string,
  mobileNumber?: string
};

export type Credential = {
  region: Region,
  username: string,
  password: string
};

export type Metadata = {
  isEmailVerified: boolean,
  isActive: boolean,
};

export enum Language {
  en = "en",
  de = "de"
}

export type Preference = {
  language: Language,
  hideTutorial: boolean
};
