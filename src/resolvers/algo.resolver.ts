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

const algoResolver = async (parent: any, context: ComputePrice) => {
  const price = pricingAlgo(
    context.startDateTime,
    context.endDateTime,
    context.pricePerHour,
    context.overWritePrice
  );

  return price;
};

export default algoResolver;
