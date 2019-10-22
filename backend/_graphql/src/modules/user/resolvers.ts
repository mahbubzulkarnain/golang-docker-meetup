import { errors, response } from "graphql-response-parser";
import { IResponse } from "../../interfaces/IResponse";
import findByEmail from "./functions/findByEmail";
import { IUser } from "./interface";

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
  User    : {
    displayName: (user: IUser) => user.displayName,
    email      : (user: IUser) => user.email,
    phoneNumber: (user: IUser) => user.phoneNumber,
    photoURL   : (user: IUser) => user.photoURL,

    chapters: (user: IUser, { input }, { dataSources: { chapterAPI } }) =>
      chapterAPI.getList({ creatorId: user.uid, ...input }),
  },
};
