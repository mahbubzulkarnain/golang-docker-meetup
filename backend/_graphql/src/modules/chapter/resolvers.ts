import { response } from "graphql-response-parser";
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

    category: (chapter: IChapter, props, { dataSources: { categoryAPI } }) =>
      categoryAPI.getById(chapter.categoryId),
    creator : (chapter: IChapter, props, { dataSources: { userAPI } }) =>
      userAPI.getById(chapter.creatorId),
    events  : (chapter: IChapter, { input }, { dataSources: { eventAPI } }) =>
      eventAPI.getList({ chapterId: chapter.id, ...input }),
    location: (chapter: IChapter, props, { dataSources: { locationAPI } }) =>
      locationAPI.getById(chapter.locationId),
  },
  Mutation: {},
  Query   : {
    chapter : async (source, { input: { id } }, { dataSources: { chapterAPI } }): Promise<IChapter | Error> =>
      chapterAPI.getById(id),
    chapters: async (source, { input }, { dataSources: { chapterAPI } }): Promise<IResponse | Error> =>
      response(await chapterAPI.getList(input)),
  },
};
