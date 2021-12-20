import middy from '@middy/core';
import algoResolver from './algo.resolver';
// import validator from '@middy/validator';
import searchPostResolver from './searchPost';
import { customMiddleware } from '../middlewares';

const infoHandler = middy(algoResolver);

const searchHandler = middy(searchPostResolver);

const resolvers = {
  Query: {
    getPrice: infoHandler,
    searchPost: searchHandler,
    info: () => 'Hello',
  },
};

export default resolvers;
