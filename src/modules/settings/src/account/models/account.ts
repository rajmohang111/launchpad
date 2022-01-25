import { Contact, Credential, Person } from "../../../../../_common/models/settings";

export type AccountUpdate = {
  person: Partial<Person>,
  contact: Partial<Contact>,
  credential: Partial<Credential>
};
