import { Context } from 'aws-lambda';

export type LambdaContext = Context;

export type ObjectLiteral = { [key: string]: any };

export enum LamdaFunctionNames {
  PRICING = 'serverless-api-dev-pricing',
}
