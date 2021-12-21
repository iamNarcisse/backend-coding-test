import middy from '@middy/core';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-lambda';
import { customMiddleware, pricingMiddleware } from './middlewares';
import resolvers from './resolvers';
import { typeDefs } from './schema';

const NODE_ENV = process.env.NODE_ENV;

const IS_DEV = !NODE_ENV || !['production'].includes(NODE_ENV);

const lambda = new ApolloServer({
  typeDefs: typeDefs,
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

  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const lambada = lambda.createHandler();

const server = middy(lambada).use(customMiddleware());

const pricing = middy(lambada).use(pricingMiddleware());

export { server, pricing };
