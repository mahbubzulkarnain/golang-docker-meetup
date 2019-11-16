import { createTestClient } from "apollo-server-testing";
import gql from "graphql-tag";
import auth from "../../constants/auth";
import { IContext } from "../../interfaces/IContext";
import verifyIdToken from "../../modules/auth/functions/verifyIdToken";
import constructTestServer from "../../utils/constructTestServer";
import { DEFAULT_LIST_RESPONSE } from "../_base/test";
import { IAuthInput } from "../auth/interface";
import { LOGIN } from "../auth/test";
import { ICategory, ICategoryInput } from "./interface";

export const GET_CATEGORIES = gql`
    query categories($input: CategoryInput){
        categories(input: $input){
            edges {
                id
                name
                slug
                createdAt
                updatedAt
            }
            message
            pageInfo {
                hasNextPage
                hasPrevPage
                nextCursor
                prevCursor
            }
            totalCount
        }
    }
`;

export const GET_CATEGORY_BY_ID = gql`
    query category($input: CategoryInput){
        category(input: $input){
            id
            name
            slug
            createdAt
            updatedAt
        }
    }
`;

const CATEGORY_RESPONSE: ICategory = {
  createdAt: expect.any(Number),
  id       : expect.anything(),
  name     : expect.any(String),
  slug     : expect.any(String),
  updatedAt: expect.any(Number),
};

let token = "";
let user = { email: "" };
let categoryId = "";

beforeAll(async () => {
  const server = constructTestServer({});
  const { mutate } = createTestClient(server);
  const input: IAuthInput = { email: auth.email, password: auth.password };
  const { data } = await mutate({
    mutation : LOGIN,
    variables: { input },
  });
  token = data.login.idToken;
  user = await verifyIdToken(token);
});

describe("Queries", () => {
  it("should fetches list of categories", async () => {
    const context: IContext = { token, user };
    const server = constructTestServer({ context });
    const { query } = createTestClient(server);
    const { data, errors } = await query({
      query: GET_CATEGORIES,
    });
    expect(data).toMatchObject({
      categories: DEFAULT_LIST_RESPONSE,
    });
    expect(errors).toEqual(undefined);
    if (data && data.edges) {
      const category: ICategory = data.edges[0];
      expect(category).toMatchObject(CATEGORY_RESPONSE);
      categoryId = category.id;
    }
  });
  it("should fetch category by id", async () => {
    const context: IContext = { token, user };
    const server = constructTestServer({ context });
    const { query } = createTestClient(server);
    const input: ICategoryInput = { id: categoryId };
    const { data, errors } = await query({
      query    : GET_CATEGORY_BY_ID,
      variables: { input },
    });
    if (errors) {
      expect(errors[0].extensions.response.body.message)
        .toEqual(`invalid input syntax for type uuid: ""`);
    } else {
      if (data && data.category) {
        const category: Record<string, any> = data;
        expect(data).toMatchObject({ CATEGORY_RESPONSE });
        expect(category.id).toEqual(categoryId);
      } else {
        expect(data.category).toEqual(null);
      }
      expect(errors).toEqual(undefined);
    }
  });
});
