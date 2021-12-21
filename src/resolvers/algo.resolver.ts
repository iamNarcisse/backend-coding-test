import pricingAlgo from '../../pricing_algo';
import { Context as LambdaContext } from 'aws-lambda';

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

const algoResolver = async (parent: any, args: ComputePrice) => {
  const price = pricingAlgo(
    args.startDateTime,
    args.endDateTime,
    args.pricePerHour,
    args.overWritePrice
  );

  return price;
};

export default algoResolver;
