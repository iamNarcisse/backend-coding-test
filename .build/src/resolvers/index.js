"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@middy/core"));
const algo_resolver_1 = __importDefault(require("./algo.resolver"));
const searchPost_1 = __importDefault(require("./searchPost"));
const middlewares_1 = require("../middlewares");
const pagination_1 = __importDefault(require("./pagination"));
const getPriceHandler = (0, core_1.default)(algo_resolver_1.default);
const searchPostHandler = (0, core_1.default)(searchPost_1.default).use((0, middlewares_1.customMiddleware)());
const resolvers = {
    Query: {
        getPrice: getPriceHandler,
        searchPost: searchPostHandler,
        getPosts: pagination_1.default,
    },
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map