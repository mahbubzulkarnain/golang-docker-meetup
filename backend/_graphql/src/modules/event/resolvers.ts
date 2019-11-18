import { response } from "graphql-response-parser";
import { IContext } from "../../interfaces/IContext";
import { IResponse } from "../../interfaces/IResponse";
import { IEvent, IEventInput, IEventsInput } from "./interface";

export default {
  Event: {
    chapterId  : (event: IEvent) => event.chapterId,
    tagId      : (event: IEvent) => event.tagId,
    venueId    : (event: IEvent) => event.venueId,

    capacity   : (event: IEvent) => event.capacity,
    description: (event: IEvent) => event.description,
    endDate    : (event: IEvent) => event.endDate,
    name       : (event: IEvent) => event.name,
    startDate  : (event: IEvent) => event.startDate,

    chapter    : (event: IEvent, props, { dataSources: { chapterAPI } }: IContext) => chapterAPI
      .getById(event.chapterId),
    tag        : (event: IEvent, props, { dataSources: { tagAPI } }: IContext) => tagAPI
      .getById(event.tagId),
    venue      : (event: IEvent, props, { dataSources: { venueAPI } }: IContext) => venueAPI
      .getById(event.venueId),
  },

  Mutation: {},
  Query   : {
    event: async (
      source,
      { input: { id } }: { input: IEventInput },
      { dataSources: { eventAPI } }: IContext,
    ): Promise<IEvent | Error> => eventAPI.getById(id),
    events: async (
      source,
      { input }: { input: IEventsInput },
      { dataSources: { eventAPI } }: IContext,
    ): Promise<IResponse | Error> => response(await eventAPI.getList(input)),
  },
};
