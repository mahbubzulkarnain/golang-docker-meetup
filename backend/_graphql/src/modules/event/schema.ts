import gql from "graphql-tag";

export default gql`
    input EventsInput {
        id: ID
        limit: Int
        offset: Int
    }
    input EventInput {
        id: ID
    }

    type Event {
        id: ID
        chapterId: ID
        tagId: ID
        venueId: ID

        name: String
        description: String
        startDate: Date
        endDate: Date
        capacity: Date

        chapter: Chapter
        tag: Tag
        venue: Venue
    }

    type EventsResponse {
        edges: [Event]
        message: String
        pageInfo: PageInfo
        totalCount: Int
    }

    extend type Query {
        events(input: EventsInput): EventsResponse @auth
        event(input: EventInput): Event @auth
    }
`;
