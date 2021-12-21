import { captureException } from '../configs/logger';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import middy from '@middy/core';

type ObjectLiteral = {
  [key: string]: any;
};

export const authorizationCheck = (headers: ObjectLiteral) => {
  const bearerToken = headers?.Authorization;
  if (!bearerToken) throw new Error('You are not authorized to access this resource');
  const bearer = bearerToken.split(' ');

  if (bearer[1] !== process.env.PUBLIC_KEY) {
    throw new Error('You are not authorized to access this resource');
  }
};

const customMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request: ObjectLiteral
  ) => {
    // return request;
  };

  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request: ObjectLiteral
  ) => {
    // Todo
    // Log to an external error monitoring tool
    // Check instance of error to hide runtime error
    throw new Error(request.error);
  };

  return {
    onError,
  };
};

export { customMiddleware };
