import middy from '@middy/core';
import algoResolver from './algo.resolver';

const infoHandler = middy(algoResolver);

const resolvers = {
  Query: {
    getPrice: infoHandler,
  },
};

export default resolvers;
