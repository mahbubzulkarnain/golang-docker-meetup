import { response } from "graphql-response-parser";
import { IResponse } from "../../interfaces/IResponse";
import { IVenue } from "./interface";

export default {
  Mutation: {},
  Query   : {
    venue : async (source, { input: { id } }, { dataSources: { venueAPI } }): Promise<IVenue | Error> =>
      venueAPI.getById(id),
    venues: async (source, { input }, { dataSources: { venueAPI } }): Promise<IResponse | Error> =>
      response(await venueAPI.getList(input)),
  },
  Venue   : {
    locationId: (venue: IVenue) => venue.locationId,

    name: (venue: IVenue) => venue.name,

    createdAt: (venue: IVenue) => venue.createdAt,
    updatedAt: (venue: IVenue) => venue.updatedAt,

    events  : (venue: IVenue, { input }, { dataSources: { eventAPI } }) =>
      eventAPI.getList({ venueId: venue.id, ...input }),
    location: (venue: IVenue, props, { dataSources: { locationAPI } }) =>
      locationAPI.getById(venue.locationId),
  },
};
