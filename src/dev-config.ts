import { GraphQLClient } from 'graphql-request';

const client = (endpoint: string, secret: string) =>
  new GraphQLClient(endpoint as string, {
    headers: {
      'x-hasura-admin-secret': secret as string,
      'content-type': 'application-json',
    },
  });

const logger = () => {};

export { client, logger };
