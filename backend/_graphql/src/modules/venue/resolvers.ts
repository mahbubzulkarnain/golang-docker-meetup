import { response } from "graphql-response-parser";
import { IContext } from "../../interfaces/IContext";
import { IResponse } from "../../interfaces/IResponse";
import { IVenue } from "./interface";

export default {
  Venue: {
    locationId: (venue: IVenue) => venue.locationId,

    name      : (venue: IVenue) => venue.name,

    createdAt : (venue: IVenue) => venue.createdAt,
    updatedAt : (venue: IVenue) => venue.updatedAt,

    events    : (venue: IVenue, { input }, { dataSources: { eventAPI } }: IContext) =>
      eventAPI.getList({ venueId: venue.id, ...input }),
    location  : (venue: IVenue, props, { dataSources: { locationAPI } }: IContext) =>
      locationAPI.getById(venue.locationId),
  },

  Mutation: {},
  Query   : {
    venue : async (
      source,
      { input: { id } },
      { dataSources: { venueAPI } }: IContext,
    ): Promise<IVenue | Error> => venueAPI.getById(id),
    venues: async (source, { input }, { dataSources: { venueAPI } }: IContext): Promise<IResponse | Error> =>
      response(await venueAPI.getList(input)),
  },
};
