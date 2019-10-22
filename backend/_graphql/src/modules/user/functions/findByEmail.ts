import * as admin from "firebase-admin";
import { auth } from "../../../vendors/firebase";
import UserRecord = admin.auth.UserRecord;

export default async (email: string): Promise<UserRecord> =>
  await auth.getUserByEmail(email);
