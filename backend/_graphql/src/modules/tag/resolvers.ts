import { response } from "graphql-response-parser";
import { IContext } from "../../interfaces/IContext";
import { IResponse } from "../../interfaces/IResponse";
import { ITag, ITagInput, ITagsInput } from "./interface";

export default {
  Tag: {
    name  : (tag: ITag) => tag.name,

    events: (tag: ITag, { input }, { dataSources: { eventAPI } }: IContext) => eventAPI
      .getList({ tagId: tag.id, ...input }),
  },

  Mutation: {},
  Query   : {
    tag : async (
      source,
      { input: { id } }: { input: ITagInput },
      { dataSources: { tagAPI } }: IContext,
    ): Promise<ITag | Error> => tagAPI.getById(id),
    tags: async (
      source,
      { input }: { input: ITagsInput },
      { dataSources: { tagAPI } }: IContext,
    ): Promise<IResponse | Error> => response(await tagAPI.getList(input)),
  },
};
