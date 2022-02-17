import { Unauthorized } from '../errors';
import { AuthToken } from 'models';
import { NextFunction, Request, Response } from 'express';
import { verify, decode } from 'jsonwebtoken';

const publicRoutes = [
  '/api/v1/user/login',
  '/api/v1/user/create',
  '/api/v1/course/',
  '/api/v1/job/',
];

export const AuthHandler = (req: Request, res: Response, _: NextFunction): void => {
  if (publicRoutes.includes(req.path)) return _();
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1] || req.query.token as string
  if (!token) throw new Unauthorized();

  try {
    verify(token, process.env.AUTH_SECRET);
    const { _id, permission } = decode(token) as AuthToken;
    req.headers.userId = _id;
    req.headers.userPermission = `${permission}`;
    return _();
  } catch {
    throw new Unauthorized();
  }
};
