import gql from "graphql-tag";

export const LOGIN = gql`
    mutation login($input: UserInput!){
        login(input: $input){
            idToken
            email
            refreshToken
            expiresIn
            localId
            registered
        }
    }
`;

