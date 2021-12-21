import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-lambda';
import fs from 'fs';
import path from 'path';
import resolvers from './resolvers';

import middy from '@middy/core';
import { customMiddleware } from './middlewares';

const typeDefPath = path.join(__dirname, 'schema.gql') as string;

const typeDefs = fs.readFileSync(typeDefPath, 'utf8');

const lambda = new ApolloServer({
  typeDefs,
  resolvers,

  context: ({ event, context, express }) => {
    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      expressRequest: express.req,
    };
  },

  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const lambada = lambda.createHandler();

const server = middy(lambada).use(customMiddleware());

export { server };
