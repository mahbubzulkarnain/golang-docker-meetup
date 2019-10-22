import { response } from "graphql-response-parser";
import { IResponse } from "../../interfaces/IResponse";
import { ILocation } from "./interface";

export default {
  Location: {
    city       : (location: ILocation) => location.city,
    country    : (location: ILocation) => location.country,
    countryCode: (location: ILocation) => location.countryCode,
    latitude   : (location: ILocation) => location.latitude,
    longitude  : (location: ILocation) => location.longitude,
    postalCode : (location: ILocation) => location.postalCode,
    region     : (location: ILocation) => location.region,

    createdAt: (location: ILocation) => location.createdAt,
    updatedAt: (location: ILocation) => location.updatedAt,

    chapters: (location: ILocation, { input }, { dataSources: { chapterAPI } }) =>
      chapterAPI.getList({ locationId: location.id, ...input }),
    venues  : (location: ILocation, { input }, { dataSources: { venueAPI } }) =>
      venueAPI.getList({ locationId: location.id, ...input }),
  },
  Mutation: {},
  Query   : {
    location : async (source, { input: { id } }, { dataSources: { locationAPI } }): Promise<ILocation | Error> =>
      locationAPI.getById(id),
    locations: async (source, { input }, { dataSources: { locationAPI } }): Promise<IResponse | Error> =>
      response(await locationAPI.getList(input)),
  },
};
