import getPrice from './queries/algoPricing';
import getPosts from './queries/pagination';
import searchPost from './queries/searchPost';

const resolvers = {
  Query: {
    getPrice,
    searchPost,
    getPosts,
  },
};

export default resolvers;
