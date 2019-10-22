import { response } from "graphql-response-parser";
import { IResponse } from "../../interfaces/IResponse";
import { ITag } from "./interface";

export default {
  Mutation: {},
  Query   : {
    tag : async (source, { input: { id } }, { dataSources: { tagAPI } }): Promise<ITag | Error> =>
      tagAPI.getById(id),
    tags: async (source, { input }, { dataSources: { tagAPI } }): Promise<IResponse | Error> =>
      response(await tagAPI.getList(input)),
  },
  Tag     : {
    name: (tag: ITag) => tag.name,

    events: (tag: ITag, { input }, { dataSources: { eventAPI } }) =>
      eventAPI.getList({ tagId: tag.id, ...input }),
  },
};
