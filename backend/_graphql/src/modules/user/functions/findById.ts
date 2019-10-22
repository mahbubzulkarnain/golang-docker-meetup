import * as admin from "firebase-admin";
import { auth } from "../../../vendors/firebase";
import UserRecord = admin.auth.UserRecord;

export default async (uid: string): Promise<UserRecord> =>
  await auth.getUser(uid);
