import { gql } from 'graphql-request';
import { client } from '../../dev-config';
import { Context as LambdaContext } from 'aws-lambda';
interface SearchPostQuery extends LambdaContext {
  title: string;
  content: string;
}
const searchPost = async (parent: any, context: SearchPostQuery) => {
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

    const variables = { content: `%${context.content}%`, title: `%${context.title}%` };
    const response = await client.request(query, variables);
    return response.blog;
  } catch (error) {
    throw error;
  }
};

export default searchPost;
