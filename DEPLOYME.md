## Setup

- Clone repo and run `yarn`
- Run `npm install -g serverless` if serverless not yet installed

## Usage

- To test it locally with serverless-offline by running:
  `yarn start:dev`

## Test

- To tests locally, run `yarn test`

- Visit https://github.com/iamNarcisse/backend-coding-test/actions for all automated tests

## Deployment

- To deploy via serveless run

`yarn deploy`

## Endpoints

- https://0fswu32yvj.execute-api.us-east-1.amazonaws.com/dev/blog
- https://0fswu32yvj.execute-api.us-east-1.amazonaws.com/dev/pricing

## Interactions

- Pricing route requires authorization
- Set 6jsfuAHYuwcqKbOVPdnAp2Gxy62cLF8VXdpIcc07Bj as Bearer Token

## Functions

- blog: serverless-api-dev-blog
- pricing: serverless-api-dev-pricing
