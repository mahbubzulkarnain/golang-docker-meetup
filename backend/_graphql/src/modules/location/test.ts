import { createTestClient } from "apollo-server-testing";
import gql from "graphql-tag";
import auth from "../../constants/auth";
import { IContext } from "../../interfaces/IContext";
import constructTestServer from "../../utils/constructTestServer";
import { DEFAULT_LIST_RESPONSE, QUERY_RESPONSE } from "../_base/test";
import { LOGIN } from "../auth/test";
import { IUser } from "../user/interface";
import { ILocation, ILocationInput } from "./interface";

export const TYPE_LOCATION = `
    id
    city
    postalCode
    region
    country
    countryCode
    latitude
    longitude
    createdAt
    updatedAt
`;

export const QUERY_LOCATIONS = gql`
    query locations($input: LocationsInput){
        locations(input: $input){
            edges {
                ${TYPE_LOCATION}
            }
            ${QUERY_RESPONSE}
        }
    }
`;

export const QUERY_LOCATION_BY_ID = gql`
    query location($input: LocationInput){
        location(input: $input){
            ${TYPE_LOCATION}
        }
    }
`;

export const LOCATION_RESPONSE: ILocation = {
  city       : expect.any(String),
  country    : expect.any(String),
  countryCode: expect.any(String),
  createdAt  : expect.any(Number),
  id         : expect.anything(),
  latitude   : expect.any(String),
  longitude  : expect.any(String),
  postalCode : expect.any(String),
  region     : expect.any(String),
  updatedAt  : expect.any(Number),
};

let token = "";
let user = {} as IUser;
let locationId = "";

beforeAll(async () => {
  const result = await LOGIN(auth.email, auth.password);
  user = result.user;
  token = result.token;
});

describe("Location", () => {
  describe("Queries", () => {
    it('should fail because "Unauthorized"', async () => {
      const server = constructTestServer({});
      const { query } = createTestClient(server);
      const { data, errors } = await query({
        query: QUERY_LOCATIONS,
      });
      expect(errors[0].message).toEqual("Unauthorized");
      expect(data.locations).toEqual(null);
    });
    it("should fetches list of locations", async () => {
      const context: IContext = { token, user };
      const server = constructTestServer({ context });
      const { query } = createTestClient(server);
      const { data, errors } = await query({
        query: QUERY_LOCATIONS,
      });
      expect(data).toMatchObject({
        locations: DEFAULT_LIST_RESPONSE,
      });
      expect(errors).toEqual(undefined);
      if (data && data.edges) {
        const location: ILocation = data.edges[0];
        expect(location).toMatchObject(LOCATION_RESPONSE);
        locationId = location.id;
      }
    });
    it("should fetch location by id", async () => {
      const context: IContext = { token, user };
      const server = constructTestServer({ context });
      const { query } = createTestClient(server);
      const input: ILocationInput = { id: locationId };
      const { data, errors } = await query({
        query    : QUERY_LOCATION_BY_ID,
        variables: { input },
      });
      if (errors) {
        expect(errors[0].extensions.response.body.message).toEqual(
          `invalid input syntax for type uuid: ""`,
        );
      } else {
        if (data && data.event) {
          const location: Record<string, any> = data;
          expect(data).toMatchObject({ LOCATION_RESPONSE });
          expect(location.id).toEqual(locationId);
        } else {
          expect(data.location).toEqual(null);
        }
        expect(errors).toEqual(undefined);
      }
    });
  });
});
