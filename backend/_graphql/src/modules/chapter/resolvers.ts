import { response } from "graphql-response-parser";
import { IDataSources } from "../../interfaces/IDataSources";
import { IResponse } from "../../interfaces/IResponse";
import { IChapter } from "./interface";

export default {
  Chapter : {
    categoryId: (chapter: IChapter) => chapter.categoryId,
    creatorId : (chapter: IChapter) => chapter.creatorId,
    locationId: (chapter: IChapter) => chapter.locationId,

    description: (chapter: IChapter) => chapter.description,
    details    : (chapter: IChapter) => chapter.details,
    name       : (chapter: IChapter) => chapter.name,

    createdAt: (chapter: IChapter) => chapter.createdAt,
    updatedAt: (chapter: IChapter) => chapter.updatedAt,

    category: (chapter: IChapter, props, { dataSources: { categoryAPI } }: IDataSources) => categoryAPI
      .getById(chapter.categoryId),
    creator : (chapter: IChapter, props, { dataSources: { userAPI } }: IDataSources) => userAPI
      .getById(chapter.creatorId),
    events  : (chapter: IChapter, { input }, { dataSources: { eventAPI } }: IDataSources) => eventAPI
      .getList({ chapterId: chapter.id, ...input }),
    location: (chapter: IChapter, props, { dataSources: { locationAPI } }: IDataSources) => locationAPI
      .getById(chapter.locationId),
  },

  Mutation: {},
  Query   : {
    chapter : async (
      source,
      { input: { id } },
      { dataSources: { chapterAPI } }: IDataSources,
    ): Promise<IChapter | Error> => chapterAPI.getById(id),
    chapters: async (
      source,
      { input },
      { dataSources: { chapterAPI } }: IDataSources,
    ): Promise<IResponse | Error> => response(await chapterAPI.getList(input)),
  },
};
