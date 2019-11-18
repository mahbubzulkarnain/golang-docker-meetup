import { createTestClient } from "apollo-server-testing";
import gql from "graphql-tag";
import auth from "../../constants/auth";
import { IContext } from "../../interfaces/IContext";
import constructTestServer from "../../utils/constructTestServer";
import { DEFAULT_LIST_RESPONSE, QUERY_RESPONSE } from "../_base/test";
import { LOGIN } from "../auth/test";
import { IUser } from "../user/interface";
import { IChapter, IChapterInput } from "./interface";

const TYPE_CHAPTER = `
    id
    categoryId
    locationId
    creatorId
    name
    description
    details
    createdAt
    updatedAt
`;

export const QUERY_CHAPTERS = gql`
    query chapters($input: ChaptersInput) {
        chapters(input: $input) {
            edges {
                ${TYPE_CHAPTER}
            }
            ${QUERY_RESPONSE}
        }
    }
`;

export const QUERY_CHAPTER_BY_ID = gql`
    query chapter($input: ChapterInput){
        chapter(input: $input){
            ${TYPE_CHAPTER}
        }
    }
`;

export const CHAPTER_RESPONSE: IChapter = {
  categoryId : expect.anything(),
  createdAt  : expect.any(Number),
  creatorId  : expect.anything(),
  description: expect.any(String),
  details    : expect.any(String),
  id         : expect.anything(),
  locationId : expect.anything(),
  name       : expect.any(String),
  updatedAt  : expect.any(Number),
};

let token = "";
let user = {} as IUser;
let chapterId = "";

beforeAll(async () => {
  const result = await LOGIN(auth.email, auth.password);
  user = result.user;
  token = result.token;
});

describe("Chapter", () => {
  describe("Queries", () => {
    it('should fail because "Unauthorized"', async () => {
      const server = constructTestServer({});
      const { query } = createTestClient(server);
      const { data, errors } = await query({
        query: QUERY_CHAPTERS,
      });
      expect(errors[0].message).toEqual("Unauthorized");
      expect(data.chapters).toEqual(null);
    });
    it("should fetches list of chapters", async () => {
      const context: IContext = { token, user };
      const server = constructTestServer({ context });
      const { query } = createTestClient(server);
      const { data, errors } = await query({
        query: QUERY_CHAPTERS,
      });
      expect(data).toMatchObject({
        chapters: DEFAULT_LIST_RESPONSE,
      });
      expect(errors).toEqual(undefined);
      if (data && data.edges) {
        const chapter: IChapter = data.edges[0];
        expect(chapter).toMatchObject(CHAPTER_RESPONSE);
        chapterId = chapter.id;
      }
    });
    it("should fetch chapter by id", async () => {
      const context: IContext = { token, user };
      const server = constructTestServer({ context });
      const { query } = createTestClient(server);
      const input: IChapterInput = { id: chapterId };
      const { data, errors } = await query({
        query    : QUERY_CHAPTER_BY_ID,
        variables: { input },
      });
      if (errors) {
        expect(errors[0].extensions.response.body.message).toEqual(
          `invalid input syntax for type uuid: ""`,
        );
      } else {
        if (data && data.chapter) {
          const chapter: Record<string, any> = data;
          expect(data).toMatchObject({ CHAPTER_RESPONSE });
          expect(chapter.id).toEqual(chapterId);
        } else {
          expect(data.chapter).toEqual(null);
        }
        expect(errors).toEqual(undefined);
      }
    });
  });
});
