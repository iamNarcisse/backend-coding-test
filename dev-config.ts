import dotenv from 'dotenv';
import { GraphQLClient } from 'graphql-request';
dotenv.config();

const client = new GraphQLClient(process.env.HASURA_ENDPOINT as string, {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_SECRET as string,
    'content-type': 'application-json',
  },
});

export { client };
