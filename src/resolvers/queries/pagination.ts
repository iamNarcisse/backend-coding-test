import { gql } from 'graphql-request';
import { client } from '../../dev-config';
import { LambdaContext, ObjectLiteral } from '../../types';

interface PaginationQueryParams {
  first: number;
}
const paginationResolver = async (
  event: ObjectLiteral,
  args: PaginationQueryParams & LambdaContext
) => {
  const myclient = client(
    process.env.HASURA_RELAY_ENDPOINT as string,
    process.env.HASURA_SECRET as string
  );

  try {
    const query = gql`
      query relay_query($first: Int!) {
        blog_connection(first: $first, order_by: { created_at: desc }) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            cursor
            node {
              id
              title
              content
              author
              created_at
              updated_at
            }
          }
        }
      }
    `;

    const variables = { first: args.first };
    const response = await myclient.request(query, variables);
    return response.blog_connection;
  } catch (error) {
    throw error;
  }
};

export default paginationResolver;
