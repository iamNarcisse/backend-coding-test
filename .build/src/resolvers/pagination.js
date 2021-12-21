"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const dev_config_1 = require("../../dev-config");
const paginationResolver = (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const myclient = (0, dev_config_1.client)(process.env.HASURA_RELAY_ENDPOINT, process.env.HASURA_SECRET);
    try {
        const query = (0, graphql_request_1.gql) `
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
        const response = yield myclient.request(query, variables);
        return response.blog_connection;
    }
    catch (error) {
        throw error;
    }
});
exports.default = paginationResolver;
//# sourceMappingURL=pagination.js.map