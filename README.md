# Backend Coding Test

## Test 1

- Fork and clone this project locally then begin the test in the repo.

- Following the serverless architecture and the microservice principles, set up a backend using both the [Middy](https://middy.js.org/) and [Serverless Framework](https://serverless.com/) that will be deployed to [AWS Lambda](https://aws.amazon.com/lambda/).

- Project should be in typescript

- Follow the Functional programming (FP) technique

- Set up a GraphQL API layer using [Hasura](https://hasura.io/) with a PostgreSQL Database

- All interactions with the database should be through the GraphQL API

- Implement & use [graphql-request](https://github.com/prisma-labs/graphql-request) to interact with with the GraphQL API

- Setup a middleware using middy that validates firebase auth token for each request using the [firebase admin library](https://firebase.google.com/docs/admin/setup).

- Setup all other middleware that would commonly be used such as for security, logging & data validation.

- The backend should provide services that will allow users to sign up a profile that consists of `name` and `date of birth` which would authenticate with firebase authentication using the [firebase admin library](https://firebase.google.com/docs/admin/setup). Profile data should be stored on the database.

- Create a blog service that allows the creation and management of blog articles. All API routes of the blog service should be protected and only accessible through the `admin` role.

- A public API route should be provided that returns a paginated list of blog articles using GraphQL Relay Cursor-based pagination method.

- Implement full text search with Hasura GraphQL API and Postgres for all blogs where their title & content are searchable

- Deploy each route to its own Lambda function using the Serverless Framework.

## Extra Points

- Implement code/typescript generation base on the GraphQL API

- Generate an [OpenAPI](https://swagger.io/specification/) documentation for all routes

## Good Job!

After completing the coding test, please provide the details listed below:

- API route links and Open API documentation

- Public GitHub link for all tests completed

- Any other information required to run and access the project such as environment keys (`.env`) and admin login

## Learn More

To learn more about some of the technologies used, take a look at the following resources:

- [Middy](https://github.com/middyjs/middy)

- [Dayjs](https://day.js.org/)

- [Serverless](https://www.serverless.com/framework/docs/)

- [AWS Lambda](https://aws.amazon.com/lambda/getting-started/)

- [PostgreSQL](https://www.postgresql.org/)

- [ElephantSQL](https://www.elephantsql.com/docs/index.html)

- [Understanding pagination: REST, GraphQL, and Relay](https://www.apollographql.com/blog/graphql/pagination/understanding-pagination-rest-graphql-and-relay/)

- [Full Text Search with Hasura GraphQL API and Postgres](https://hasura.io/blog/full-text-search-with-hasura-graphql-api-postgres/)
