import gql from 'graphql-tag';

const typeDefs = gql`
  type Query {
    info: String!
    getPrice(startDateTime: String!, endDateTime: String!, pricePerHour: Int!): Float!
    posts(after: Int!, count: Int!): [Post!]!
    searchPost(title: String!, content: String!): [Post!]
  }

  type Post {
    id: String
    title: String!
    content: String
    author: String
    created_at: String
    updated_at: String
  }
`;

export default typeDefs;
