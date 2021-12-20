import middy from '@middy/core';
import algoResolver from './algo.resolver';
// import validator from '@middy/validator';
import searchPostResolver from './searchPost';
import { customMiddleware } from '../middlewares';

const infoHandler = algoResolver;

const searchHandler = middy(searchPostResolver).use(customMiddleware());

const resolvers = {
  Query: {
    getPrice: infoHandler,
    searchPost: searchHandler,
  },
};

export default resolvers;
