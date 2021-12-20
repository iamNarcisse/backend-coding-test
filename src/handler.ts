import { ApolloServer } from 'apollo-server-lambda';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import fs from 'fs';
import path from 'path';
import resolvers from './resolvers';

const typeDefPath = path.join(__dirname, 'schema.gql') as string;

// get the GraphQL schema
const typeDefs = fs.readFileSync(typeDefPath, 'utf8');

const lambda = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const server = lambda.createHandler();

// server.listen().then(({ url }) => console.log(`Server is running on ${url}`));

export { server };
