import gql from "graphql-tag";

export default gql`
input VenueInput {
  id: ID
}

type Venue {
  id: ID
  locationId: ID

  name: String

  createdAt: Date
  updatedAt: Date

  events: [Event]
  location: Location
}

type VenuesResponse {
  edges: [Venue]
  message: String
  pageInfo: PageInfo
  totalCount: Int
}

extend type Query {
  venues(input: VenueInput): VenuesResponse @auth
  venue(input: VenueInput): Venue @auth
}
`;
