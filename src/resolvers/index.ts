import infoResolver from './info.resolver';

const resolvers = {
  Query: {
    info: infoResolver,
  },
};

export default resolvers;
