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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pricing_algo_1 = __importDefault(require("../../../pricing_algo"));
const middlewares_1 = require("../../middlewares");
const types_1 = require("../../types");
const algoResolver = (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.functionName !== types_1.LamdaFunctionNames.PRICING) {
        throw new Error('Route not allowed');
    }
    (0, middlewares_1.authorizationCheck)(context.headers);
    const price = (0, pricing_algo_1.default)(args.startDateTime, args.endDateTime, args.pricePerHour, args.overWritePrice);
    return price;
});
exports.default = algoResolver;
//# sourceMappingURL=algoPricing.js.map