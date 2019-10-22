export default `
input CategoryInput {
  id: ID
}

type Category {
  id: ID
  name: String
  slug: String

  createdAt: Date
  updatedAt: Date

  chapters: [Chapter]
}

type CategoriesResponse {
  edges: [Category]
  message: String
  pageInfo: PageInfo
  totalCount: Int
}

extend type Query {
  categories(input: CategoryInput): CategoriesResponse @auth
  category(input: CategoryInput): Category @auth
}
`;
