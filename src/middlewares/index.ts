const defaults = {};

const customMiddleware = (opts = {}) => {
  const options = { ...defaults, ...opts };

  const authenticateMiddleware = async (request: any) => {
    // might read options
  };
  const customMiddlewareAfter = async (request: any) => {
    // might read options
  };
  const errorTracking = async (request: any) => {
    console.log(request, 'Log to sentry=======>');
    // might read options
  };

  return {
    before: authenticateMiddleware,
    after: customMiddlewareAfter,
    onError: errorTracking,
  };
};

export { customMiddleware };
