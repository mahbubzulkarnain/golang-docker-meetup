import { response } from "graphql-response-parser";
import { IResponse } from "../../interfaces/IResponse";
import { IEvent } from "./interface";

export default {
  Event   : {
    chapterId: (event: IEvent) => event.chapterId,
    tagId    : (event: IEvent) => event.tagId,
    venueId  : (event: IEvent) => event.venueId,

    capacity   : (event: IEvent) => event.capacity,
    description: (event: IEvent) => event.description,
    endDate    : (event: IEvent) => event.endDate,
    name       : (event: IEvent) => event.name,
    startDate  : (event: IEvent) => event.startDate,

    chapter: (event: IEvent, props, { dataSources: { chapterAPI } }) => chapterAPI.getById(event.chapterId),
    tag    : (event: IEvent, props, { dataSources: { tagAPI } }) => tagAPI.getById(event.tagId),
    venue  : (event: IEvent, props, { dataSources: { venueAPI } }) => venueAPI.getById(event.venueId),
  },
  Mutation: {},
  Query   : {
    event : async (source, { input: { id } }, { dataSources: { eventAPI } }): Promise<IEvent | Error> =>
      eventAPI.getById(id),
    events: async (source, { input }, { dataSources: { eventAPI } }): Promise<IResponse | Error> =>
      response(await eventAPI.getList(input)),
  },
};
