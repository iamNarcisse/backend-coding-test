import { gql } from 'graphql-request';
import { client } from '../../dev-config';
import { Context as LambdaContext } from 'aws-lambda';
import { ObjectLiteral } from '../../types';
interface SearchPostQuery extends LambdaContext {
  title: string;
  content: string;
}
const searchPost = async (parent: ObjectLiteral, args: SearchPostQuery) => {
  const myclient = client(
    process.env.HASURA_ENDPOINT as string,
    process.env.HASURA_SECRET as string
  );

  try {
    const query = gql`
      query query($title: String!, $content: String!) {
        blog(where: { _or: [{ title: { _ilike: $title } }, { content: { _ilike: $content } }] }) {
          id
          title
          content
          author
          created_at
          updated_at
        }
      }
    `;

    const variables = { content: `%${args.content}%`, title: `%${args.title}%` };
    const response = await myclient.request(query, variables);

    return response.blog;
  } catch (error) {
    throw error;
  }
};

export default searchPost;
