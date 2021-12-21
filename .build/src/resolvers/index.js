"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const algoPricing_1 = __importDefault(require("./queries/algoPricing"));
const pagination_1 = __importDefault(require("./queries/pagination"));
const searchPost_1 = __importDefault(require("./queries/searchPost"));
const resolvers = {
    Query: {
        getPrice: algoPricing_1.default,
        searchPost: searchPost_1.default,
        getPosts: pagination_1.default,
    },
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map