"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@middy/core"));
const algo_resolver_1 = __importDefault(require("./algo.resolver"));
// import validator from '@middy/validator';
const searchPost_1 = __importDefault(require("./searchPost"));
const infoHandler = (0, core_1.default)(algo_resolver_1.default);
const searchHandler = (0, core_1.default)(searchPost_1.default);
const resolvers = {
    Query: {
        getPrice: infoHandler,
        searchPost: searchHandler,
        info: () => 'Hello',
    },
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map