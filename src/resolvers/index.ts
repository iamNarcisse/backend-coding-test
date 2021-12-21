import middy from '@middy/core';
import algoResolver from './algo.resolver';
import searchPostResolver from './searchPost';
import { customMiddleware } from '../middlewares';
import paginationResolver from './pagination';

const getPriceHandler = middy(algoResolver);

const searchPostHandler = middy(searchPostResolver).use(customMiddleware());

const resolvers = {
  Query: {
    getPrice: getPriceHandler,
    searchPost: searchPostHandler,
    getPosts: paginationResolver,
  },
};

export default resolvers;
