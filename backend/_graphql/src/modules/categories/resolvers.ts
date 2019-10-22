import { response } from "graphql-response-parser";
import { IResponse } from "../../interfaces/IResponse";
import { ICategory } from "./interface";

export default {
  Category: {
    name: (category: ICategory) => category.name,
    slug: (category: ICategory) => category.slug,

    createdAt: (category: ICategory) => category.createdAt,
    updatedAt: (category: ICategory) => category.updatedAt,

    chapters: (category: ICategory, { input }, { dataSources: { chapterAPI } }) =>
      chapterAPI.getList({ categoryId: category.id, ...input }),
  },
  Mutation: {},
  Query   : {
    categories: async (source, { input }, { dataSources: { categoryAPI } }): Promise<IResponse | Error> =>
      response(await categoryAPI.getList(input)),
    category  : async (source, { input: { id } }, { dataSources: { categoryAPI } }): Promise<ICategory | Error> =>
      categoryAPI.getById(id),
  },
};
