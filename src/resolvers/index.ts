import middy from '@middy/core';
import algoResolver from './algo.resolver';
import searchPostResolver from './searchPost';

const infoHandler = middy(algoResolver);

const resolvers = {
  Query: {
    getPrice: infoHandler,
    searchPost: searchPostResolver,
  },
};

export default resolvers;
