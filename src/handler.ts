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

  context: ({ event, context, express }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
    expressRequest: express.req,
  }),

  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const server = lambda.createHandler();

export { server };
