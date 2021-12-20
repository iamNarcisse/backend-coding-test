import { gql } from 'graphql-request';
import * as faker from 'faker';
import { client } from './dev-config';

const query = gql`
  mutation insert_blog($id: uuid, $title: String, $content: String, $author: String) {
    insert_blog(objects: { id: $id, title: $title, content: $content, author: $author }) {
      returning {
        id
      }
    }
  }
`;

const seed = () => {
  for (let index = 1; index < 20; index++) {
    const variables = {
      id: faker.datatype.uuid(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      author: faker.name.firstName(),
    };

    client
      .request(query, variables)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
};
seed();
