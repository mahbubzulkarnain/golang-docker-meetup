import { response } from "graphql-response-parser";
import { IDataSources } from "../../interfaces/IDataSources";
import { IResponse } from "../../interfaces/IResponse";
import { ITag } from "./interface";

export default {
  Tag     : {
    name: (tag: ITag) => tag.name,

    events: (tag: ITag, { input }, { dataSources: { eventAPI } }: IDataSources) => eventAPI
      .getList({ tagId: tag.id, ...input }),
  },

  Mutation: {},
  Query   : {
    tag : async (source, { input: { id } }, { dataSources: { tagAPI } }: IDataSources): Promise<ITag | Error> =>
      tagAPI.getById(id),
    tags: async (source, { input }, { dataSources: { tagAPI } }: IDataSources): Promise<IResponse | Error> =>
      response(await tagAPI.getList(input)),
  },
};
