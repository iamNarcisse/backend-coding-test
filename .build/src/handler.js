"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_lambda_1 = require("apollo-server-lambda");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const resolvers_1 = __importDefault(require("./resolvers"));
const core_1 = __importDefault(require("@middy/core"));
const middlewares_1 = require("./middlewares");
const typeDefPath = path_1.default.join(__dirname, 'schema.gql');
const typeDefs = fs_1.default.readFileSync(typeDefPath, 'utf8');
const lambda = new apollo_server_lambda_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.default,
    context: ({ event, context, express }) => {
        return {
            headers: event.headers,
            functionName: context.functionName,
            event,
            context,
            expressRequest: express.req,
        };
    },
    plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
});
const ser = lambda.createHandler();
const server = (0, core_1.default)(ser).use((0, middlewares_1.customMiddleware)());
exports.server = server;
//# sourceMappingURL=handler.js.map