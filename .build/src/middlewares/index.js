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
exports.customMiddleware = exports.authorizationCheck = void 0;
const authorizationCheck = (headers) => {
    const bearerToken = headers === null || headers === void 0 ? void 0 : headers.Authorization;
    if (!bearerToken)
        throw 'No token';
    const bearer = bearerToken.split(' ');
    if (bearer[1] !== process.env.PUBLIC_KEY) {
        throw new Error('You are not authorized to access this resource');
    }
};
exports.authorizationCheck = authorizationCheck;
const customMiddleware = () => {
    const before = (request) => __awaiter(void 0, void 0, void 0, function* () {
        // return request;
    });
    const onError = (request) => __awaiter(void 0, void 0, void 0, function* () {
        // Todo
        // Log to an external error monitoring tool
        // Check instance of error to hide runtime error
        throw new Error(request.error);
    });
    return {
        onError,
    };
};
exports.customMiddleware = customMiddleware;
//# sourceMappingURL=index.js.map