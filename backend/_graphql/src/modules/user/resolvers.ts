import { errors, response } from "graphql-response-parser";
import { IResponse } from "../../interfaces/IResponse";
import findByEmail from "./functions/findByEmail";

export default {
  Mutation: {},
  Query   : {
    me: (source, props, { user }): Promise<IResponse | Error> => new Promise(async (resolve, reject) => {
      try {
        resolve(response(await findByEmail(user.email)));
      } catch (e) {
        reject(errors(e));
      }
    }),
  },
};
