import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { isEmail } from "validator";
import { IContext } from "../interfaces/IContext";
import verifyIdToken from "../modules/auth/functions/verifyIdToken";

const ENV = (process.env.NODE_ENV || "dev").toLowerCase();
const DEV = (ENV !== "production") && (ENV !== "prod");

export default async ({ connection, req, res }: ExpressContext): Promise<IContext> => {
  const defaultContext = { req, res, DEV };
  if (connection) {
    return connection.context;
  }
  if (!req || !req.headers) {
    return defaultContext;
  }
  const token = req.headers.authorization || "";

  let user = { email: "" };
  if (token) {
    user = await verifyIdToken(token);
    user = (user && isEmail(user.email)) ? user : { email: "" };
  }

  return { ...defaultContext, token, user };
};
