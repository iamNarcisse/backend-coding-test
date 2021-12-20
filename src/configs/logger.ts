import Sentry, { captureException } from '@sentry/serverless';
import { Handler } from 'aws-lambda';

Sentry.AWSLambda.init({
  dsn: process.env.SENTRY_DSN as string,
  tracesSampleRate: 1.0,
});

export { captureException };
