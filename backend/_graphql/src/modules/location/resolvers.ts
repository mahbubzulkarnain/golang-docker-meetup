import { response } from "graphql-response-parser";
import { IContext } from "../../interfaces/IContext";
import { IResponse } from "../../interfaces/IResponse";
import { ILocation, ILocationInput, ILocationsInput } from "./interface";

export default {
  Location: {
    city       : (location: ILocation) => location.city,
    country    : (location: ILocation) => location.country,
    countryCode: (location: ILocation) => location.countryCode,
    latitude   : (location: ILocation) => location.latitude,
    longitude  : (location: ILocation) => location.longitude,
    postalCode : (location: ILocation) => location.postalCode,
    region     : (location: ILocation) => location.region,

    createdAt  : (location: ILocation) => location.createdAt,
    updatedAt  : (location: ILocation) => location.updatedAt,

    chapters   : (location: ILocation, { input }, { dataSources: { chapterAPI } }: IContext) => chapterAPI
      .getList({ locationId: location.id, ...input }),
    venues     : (location: ILocation, { input }, { dataSources: { venueAPI } }: IContext) => venueAPI
      .getList({ locationId: location.id, ...input }),
  },

  Mutation: {},
  Query   : {
    location : async (
      source,
      { input: { id } }: { input: ILocationInput },
      { dataSources: { locationAPI } }: IContext,
    ): Promise<ILocation | Error> => locationAPI.getById(id),
    locations: async (
      source,
      { input }: { input: ILocationsInput },
      { dataSources: { locationAPI } }: IContext,
    ): Promise<IResponse | Error> => response(await locationAPI.getList(input)),
  },
};
