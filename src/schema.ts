import { ApolloServer, gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Query {
    getPrice(startDateTime: String!, endDateTime: String!, pricePerHour: Int!): Float!
    searchPost(title: String!, content: String!): [Post!]
    getPosts(first: Int!): PaginationResponse!
  }

  type Post {
    id: String
    title: String!
    content: String
    author: String
    created_at: String
    updated_at: String
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String!
    endCursor: String!
  }

  type TableEdge {
    cursor: String!
    node: Post
  }

  type PaginationResponse {
    pageInfo: PageInfo!
    edges: [TableEdge!]
  }

  type OverwritePrice {
    startDateTime: String!
    endDateTime: String!
    pricePerHour: Int!
  }
`;
