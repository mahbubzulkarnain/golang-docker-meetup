import { createTestClient } from "apollo-server-testing";
import gql from "graphql-tag";
import auth from "../../constants/auth";
import { IContext } from "../../interfaces/IContext";
import constructTestServer from "../../utils/constructTestServer";
import { DEFAULT_LIST_RESPONSE, QUERY_RESPONSE } from "../_base/test";
import { LOGIN } from "../auth/test";
import { CHAPTER_RESPONSE } from "../chapter/test";
import { IUser } from "../user/interface";
import { IEvent, IEventInput } from "./interface";

export const TYPE_EVENT = `
    id
    chapterId
    tagId
    venueId
    name
    description
    startDate
    endDate
    capacity
`;

export const QUERY_EVENTS = gql`
    query events($input: EventsInput){
        events(input: $input){
            edges {
                ${TYPE_EVENT}
            }
            ${QUERY_RESPONSE}
        }
    }
`;

export const QUERY_EVENT_BY_ID = gql`
    query event($input: EventInput){
        event(input: $input){
            ${TYPE_EVENT}
        }
    }
`;

export const EVENT_RESPONSE: IEvent = {
  capacity   : expect.any(String),
  chapterId  : expect.anything(),
  createdAt  : expect.any(Number),
  description: expect.any(String),
  endDate    : expect.any(String),
  id         : expect.anything(),
  name       : expect.any(String),
  startDate  : expect.any(String),
  tagId      : expect.anything(),
  updatedAt  : expect.any(Number),
  venueId    : expect.anything(),
};

let token = "";
let user = {} as IUser;
let eventId = "";

beforeAll(async () => {
  const result = await LOGIN(auth.email, auth.password);
  user = result.user;
  token = result.token;
});

describe("Event", () => {
  describe("Queries", () => {
    it('should fail because "Unauthorized"', async () => {
      const server = constructTestServer({});
      const { query } = createTestClient(server);
      const { data, errors } = await query({
        query: QUERY_EVENTS,
      });
      expect(errors[0].message).toEqual("Unauthorized");
      expect(data.events).toEqual(null);
    });
    it("should fetches list of events", async () => {
      const context: IContext = { token, user };
      const server = constructTestServer({ context });
      const { query } = createTestClient(server);
      const { data, errors } = await query({
        query: QUERY_EVENTS,
      });
      expect(data).toMatchObject({
        chapters: DEFAULT_LIST_RESPONSE,
      });
      expect(errors).toEqual(undefined);
      if (data && data.edges) {
        const event: IEvent = data.edges[0];
        expect(event).toMatchObject(EVENT_RESPONSE);
        eventId = event.id;
      }
    });
    it("should fetch event by id", async () => {
      const context: IContext = { token, user };
      const server = constructTestServer({ context });
      const { query } = createTestClient(server);
      const input: IEventInput = { id: eventId };
      const { data, errors } = await query({
        query    : QUERY_EVENT_BY_ID,
        variables: { input },
      });
      if (errors) {
        expect(errors[0].extensions.response.body.message).toEqual(
          `invalid input syntax for type uuid: ""`,
        );
      } else {
        if (data && data.event) {
          const event: Record<string, any> = data;
          expect(data).toMatchObject({ CHAPTER_RESPONSE });
          expect(event.id).toEqual(eventId);
        } else {
          expect(data.event).toEqual(null);
        }
        expect(errors).toEqual(undefined);
      }
    });
  });
});
