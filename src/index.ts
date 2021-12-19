import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './types';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
