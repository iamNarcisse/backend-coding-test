"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const apollo_server_lambda_1 = require("apollo-server-lambda");
const apollo_server_core_1 = require("apollo-server-core");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resolvers_1 = __importDefault(require("./resolvers"));
const typeDefPath = path_1.default.join(__dirname, 'schema.gql');
// get the GraphQL schema
const typeDefs = fs_1.default.readFileSync(typeDefPath, 'utf8');
const lambda = new apollo_server_lambda_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.default,
    plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
});
const server = lambda.createHandler();
exports.server = server;
//# sourceMappingURL=handler.js.map