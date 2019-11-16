import { response } from "graphql-response-parser";
import { IDataSources } from "../../interfaces/IDataSources";
import { IResponse } from "../../interfaces/IResponse";
import { IVenue } from "./interface";

export default {
  Venue: {
    locationId: (venue: IVenue) => venue.locationId,

    name: (venue: IVenue) => venue.name,

    createdAt: (venue: IVenue) => venue.createdAt,
    updatedAt: (venue: IVenue) => venue.updatedAt,

    events  : (venue: IVenue, { input }, { dataSources: { eventAPI } }: IDataSources) =>
      eventAPI.getList({ venueId: venue.id, ...input }),
    location: (venue: IVenue, props, { dataSources: { locationAPI } }: IDataSources) =>
      locationAPI.getById(venue.locationId),
  },

  Mutation: {},
  Query   : {
    venue : async (
      source,
      { input: { id } },
      { dataSources: { venueAPI } }: IDataSources,
    ): Promise<IVenue | Error> => venueAPI.getById(id),
    venues: async (source, { input }, { dataSources: { venueAPI } }: IDataSources): Promise<IResponse | Error> =>
      response(await venueAPI.getList(input)),
  },
};
