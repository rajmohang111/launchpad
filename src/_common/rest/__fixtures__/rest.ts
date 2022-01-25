import { Credential } from "../models/rest";
import {Region} from "../../models/system";

export const createCredentialFixture = (): Credential => ({
  region: Region.DEVELOPMENT,
  username: "testUsername",
  password: "testPassword"
});
