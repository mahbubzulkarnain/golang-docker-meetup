import gql from "graphql-tag";

export default gql`
    input ChaptersInput {
        id: ID
        limit: Int
        offset: Int
    }
    input ChapterInput {
        id: ID
    }

    type Chapter {
        id: ID
        categoryId: ID
        locationId: ID
        creatorId: ID

        name: String
        description: String
        details: String

        createdAt: Date
        updatedAt: Date

        category: Category
        events: [Event]
        location: Location
        creator: User
    }

    type ChaptersResponse {
        edges: [Chapter]
        message: String
        pageInfo: PageInfo
        totalCount: Int
    }

    extend type Query {
        chapters(input: ChaptersInput): ChaptersResponse @auth
        chapter(input: ChapterInput): Chapter @auth
    }
`;
