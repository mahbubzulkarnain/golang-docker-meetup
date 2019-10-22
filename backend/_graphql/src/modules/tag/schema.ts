export default `
input TagInput {
  id: ID
}

type Tag {
  id: ID

  name: String

  events(input: EventInput): [Event]
}

type TagsResponse {
  edges: [Tag]
  message: String
  pageInfo: PageInfo
  totalCount: Int
}

extend type Query {
  tags(input: TagInput): TagsResponse @auth
  tag(input: TagInput): Tag @auth
}
`;
