import { errors } from "graphql-response-parser";
import { auth } from "../../../vendors/firebase";

export default async (uid: string): Promise<void | Error> =>
  await auth.deleteUser(uid).catch(errors);
