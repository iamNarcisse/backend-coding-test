import pricingAlgo from '../../pricing_algo';
import { Context as LambdaContext } from 'aws-lambda';
import { authorizationCheck } from '../../middlewares';
import { LamdaFunctionNames, ObjectLiteral } from '../../types';

interface OverwritePrice {
  startDateTime: Date;
  endDateTime: Date;
  pricePerHour: number;
}

interface ComputePrice extends LambdaContext {
  startDateTime: Date;
  endDateTime: Date;
  pricePerHour: number;
  overWritePrice?: OverwritePrice[];
}

const algoResolver = async (parent: any, args: ComputePrice, context: ObjectLiteral) => {
  if (context.functionName !== LamdaFunctionNames.PRICING) {
    throw new Error('Route not allowed');
  }

  authorizationCheck(context.headers);

  const price = pricingAlgo(
    args.startDateTime,
    args.endDateTime,
    args.pricePerHour,
    args.overWritePrice
  );

  return price;
};

export default algoResolver;
