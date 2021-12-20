"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const graphql_request_1 = require("graphql-request");
dotenv_1.default.config();
const client = (endpoint, secret) => new graphql_request_1.GraphQLClient(endpoint, {
    headers: {
        'x-hasura-admin-secret': secret,
        'content-type': 'application-json',
    },
});
exports.client = client;
const logger = () => { };
exports.logger = logger;
//# sourceMappingURL=dev-config.js.map