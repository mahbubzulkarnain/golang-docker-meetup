import { response } from "graphql-response-parser";
import { IContext } from "../../interfaces/IContext";
import { IResponse } from "../../interfaces/IResponse";
import { ICategoriesInput, ICategory, ICategoryInput } from "./interface";

export default {
  Category: {
    name     : (category: ICategory) => category.name,
    slug     : (category: ICategory) => category.slug,

    createdAt: (category: ICategory) => category.createdAt,
    updatedAt: (category: ICategory) => category.updatedAt,

    chapters : (category: ICategory, { input }, { dataSources: { chapterAPI } }: IContext) => chapterAPI
      .getList({ categoryId: category.id, ...input }),
  },

  Mutation: {},
  Query   : {
    categories: async (
      source,
      { input }: { input: ICategoriesInput },
      { dataSources: { categoryAPI } }: IContext,
    ): Promise<IResponse | Error> => response(await categoryAPI.getList(input)),
    category  : async (
      source,
      { input: { id } }: { input: ICategoryInput },
      { dataSources: { categoryAPI } }: IContext,
    ): Promise<ICategory | Error> => categoryAPI.getById(id),
  },
};
