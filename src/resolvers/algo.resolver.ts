import pricingAlgo from '../../pricing_algo';
import { Context as LambdaContext } from 'aws-lambda';

interface OverwritePrice {
  startDateTime: Date;
  endDateTime: Date;
  pricePerHour: number;
}

interface ComputePrice {
  startDateTime: Date;
  endDateTime: Date;
  pricePerHour: number;
  overWritePrice?: OverwritePrice[];
}

const algoResolver = async (_: unknown, args: ComputePrice, context: LambdaContext) => {
  const price = pricingAlgo(
    args.startDateTime,
    args.endDateTime,
    args.pricePerHour,
    args.overWritePrice
  );

  return price;
};

export default algoResolver;
