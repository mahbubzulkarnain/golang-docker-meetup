import * as admin from "firebase-admin";
import { auth } from "../../../vendors/firebase";
import ListUsersResult = admin.auth.ListUsersResult;

export default async (maxResults: number = 10, pageToken?: string): Promise<ListUsersResult> =>
  await auth.listUsers(maxResults, pageToken);
