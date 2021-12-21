import { captureException } from '../configs/logger';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import middy from '@middy/core';

type ObjectLiteral = {
  [key: string]: any;
};

const customMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request: ObjectLiteral
  ) => {
    // return request;
  };

  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request: ObjectLiteral
  ): Promise<void> => {
    captureException(request.error, {
      extra: request.context,
    });
  };

  return {
    before,
    onError,
  };
};

export { customMiddleware };
