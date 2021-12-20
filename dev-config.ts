import dotenv from 'dotenv';
import { GraphQLClient } from 'graphql-request';
dotenv.config();

const client = (endpoint: string, secret: string) =>
  new GraphQLClient(endpoint as string, {
    headers: {
      'x-hasura-admin-secret': secret as string,
      'content-type': 'application-json',
    },
  });

const logger = () => {};

export { client, logger };
