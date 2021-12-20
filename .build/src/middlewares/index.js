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
exports.customMiddleware = void 0;
const defaults = {};
const customMiddleware = (opts = {}) => {
    const options = Object.assign(Object.assign({}, defaults), opts);
    const authenticateMiddleware = (request) => __awaiter(void 0, void 0, void 0, function* () {
        // might read options
    });
    const customMiddlewareAfter = (request) => __awaiter(void 0, void 0, void 0, function* () {
        // might read options
    });
    const errorTracking = (request) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(request, 'Log to sentry=======>');
        // might read options
    });
    return {
        before: authenticateMiddleware,
        after: customMiddlewareAfter,
        onError: errorTracking,
    };
};
exports.customMiddleware = customMiddleware;
//# sourceMappingURL=index.js.map