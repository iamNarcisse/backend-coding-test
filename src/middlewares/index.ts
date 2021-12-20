import { captureException } from '../configs/logger';

const defaults = {};

type ObjectLiteral = {
  [key: string]: any;
};

const customMiddleware = (opts = {}) => {
  const options = { ...defaults, ...opts };

  const authenticateMiddleware = async (request: any) => {
    // might read options
  };
  const customMiddlewareAfter = async (request: {}) => {
    // might read options
  };
  const errorTracking = async (request: ObjectLiteral) => {
    console.log(request.error, 'Log error to sentry=======>');
    captureException(request.error, {
      extra: request.context,
    });

    return request;
  };

  return {
    before: authenticateMiddleware,
    after: customMiddlewareAfter,
    onError: errorTracking,
  };
};

export { customMiddleware };
