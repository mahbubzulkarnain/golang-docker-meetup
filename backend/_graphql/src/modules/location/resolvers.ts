import { response } from "graphql-response-parser";
import { IDataSources } from "../../interfaces/IDataSources";
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

    createdAt  : (location: ILocation) => location.createdAt,
    updatedAt  : (location: ILocation) => location.updatedAt,

    chapters   : (location: ILocation, { input }, { dataSources: { chapterAPI } }: IDataSources) => chapterAPI
      .getList({ locationId: location.id, ...input }),
    venues     : (location: ILocation, { input }, { dataSources: { venueAPI } }: IDataSources) => venueAPI
      .getList({ locationId: location.id, ...input }),
  },

  Mutation: {},
  Query   : {
    location : async (
      source,
      { input: { id } },
      { dataSources: { locationAPI } }: IDataSources,
    ): Promise<ILocation | Error> => locationAPI.getById(id),
    locations: async (source, { input }, { dataSources: { locationAPI } }: IDataSources): Promise<IResponse | Error> =>
      response(await locationAPI.getList(input)),
  },
};
