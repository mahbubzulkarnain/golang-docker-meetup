import gql from "graphql-tag";

export default gql`
    input LocationsInput {
        id: ID
    }
    input LocationInput {
        id: ID
    }

    type Location {
        id: ID

        city: String
        postalCode: String
        region: String
        country: String
        countryCode: String
        latitude: Float
        longitude: Float

        createdAt: Date
        updatedAt: Date

        chapters: [Chapter]
        venues: [Venue]
    }

    type LocationsResponse {
        edges: [Location]
        message: String
        pageInfo: PageInfo
        totalCount: Int
    }

    extend type Query {
        locations(input: LocationsInput): LocationsResponse @auth
        location(input: LocationInput): Location @auth
    }
`;
