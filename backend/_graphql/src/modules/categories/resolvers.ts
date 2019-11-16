import { response } from "graphql-response-parser";
import { IDataSources } from "../../interfaces/IDataSources";
import { IResponse } from "../../interfaces/IResponse";
import { ICategory } from "./interface";

export default {
  Category: {
    name: (category: ICategory) => category.name,
    slug: (category: ICategory) => category.slug,

    createdAt: (category: ICategory) => category.createdAt,
    updatedAt: (category: ICategory) => category.updatedAt,

    chapters: (category: ICategory, { input }, { dataSources: { chapterAPI } }: IDataSources) => chapterAPI
      .getList({ categoryId: category.id, ...input }),
  },

  Mutation: {},
  Query   : {
    categories: async (
      source,
      { input },
      { dataSources: { categoryAPI } }: IDataSources,
    ): Promise<IResponse | Error> => response(await categoryAPI.getList(input)),
    category  : async (
      source,
      { input: { id } },
      { dataSources: { categoryAPI } }: IDataSources,
    ): Promise<ICategory | Error> => categoryAPI.getById(id),
  },
};
