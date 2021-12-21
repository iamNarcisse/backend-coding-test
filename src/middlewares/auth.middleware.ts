import { ObjectLiteral } from '../types';

export const authorizationCheck = (headers: ObjectLiteral) => {
  const bearerToken = headers?.Authorization;
  if (!bearerToken) throw new Error('You are not authorized to access this resource');
  const bearer = bearerToken.split(' ');

  if (bearer[1] !== process.env.PUBLIC_KEY) {
    throw new Error('You are not authorized to access this resource');
  }
};
