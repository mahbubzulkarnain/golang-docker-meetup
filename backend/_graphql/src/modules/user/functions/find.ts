import * as admin from "firebase-admin";
import { errors } from "graphql-response-parser";
import { auth } from "../../../vendors/firebase";
import ListUsersResult = admin.auth.ListUsersResult;

export default async (maxResults: number = 10, pageToken?: string): Promise<ListUsersResult | Error> =>
  await auth.listUsers(maxResults, pageToken).catch(errors);
