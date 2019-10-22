import * as admin from "firebase-admin";
import { errors } from "graphql-response-parser";
import { auth } from "../../../vendors/firebase";
import UserRecord = admin.auth.UserRecord;

export default async (uid: string): Promise<UserRecord | Error> =>
  await auth.getUser(uid).catch(errors);
