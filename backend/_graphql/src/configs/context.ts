import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { isEmail } from "validator";
import { IContext } from "../interfaces/IContext";
import verifyIdToken from "../modules/auth/functions/verifyIdToken";

export default async ({ connection, req }: ExpressContext): Promise<IContext> => {
  if (connection) {
    return connection.context;
  }
  if (!req || !req.headers) {
    return;
  }
  const token = req.headers.authorization || "";

  let user;
  if (token) {
    user = await verifyIdToken(token);
    user = (user && isEmail(user.email)) ? user : "";
  }

  return { user, token };
};
