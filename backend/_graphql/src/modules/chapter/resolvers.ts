import { response } from "graphql-response-parser";
import { IContext } from "../../interfaces/IContext";
import { IResponse } from "../../interfaces/IResponse";
import { IChapter, IChapterInput, IChaptersInput } from "./interface";

export default {
  Chapter: {
    categoryId : (chapter: IChapter) => chapter.categoryId,
    creatorId  : (chapter: IChapter) => chapter.creatorId,
    locationId : (chapter: IChapter) => chapter.locationId,

    description: (chapter: IChapter) => chapter.description,
    details    : (chapter: IChapter) => chapter.details,
    name       : (chapter: IChapter) => chapter.name,

    createdAt  : (chapter: IChapter) => chapter.createdAt,
    updatedAt  : (chapter: IChapter) => chapter.updatedAt,

    category   : (chapter: IChapter, props, { dataSources: { categoryAPI } }: IContext) => categoryAPI
      .getById(chapter.categoryId),
    creator    : (chapter: IChapter, props, { dataSources: { userAPI } }: IContext) => userAPI
      .getById(chapter.creatorId),
    events     : (chapter: IChapter, { input }, { dataSources: { eventAPI } }: IContext) => eventAPI
      .getList({ chapterId: chapter.id, ...input }),
    location   : (chapter: IChapter, props, { dataSources: { locationAPI } }: IContext) => locationAPI
      .getById(chapter.locationId),
  },

  Mutation: {},
  Query   : {
    chapter : async (
      source,
      { input: { id } }: { input: IChapterInput },
      { dataSources: { chapterAPI } }: IContext,
    ): Promise<IChapter | Error> => chapterAPI.getById(id),
    chapters: async (
      source,
      { input }: { input: IChaptersInput },
      { dataSources: { chapterAPI } }: IContext,
    ): Promise<IResponse | Error> => response(await chapterAPI.getList(input)),
  },
};
