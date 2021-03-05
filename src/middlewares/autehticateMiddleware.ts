/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: 'Token inexistente ou invalido' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = jwt.verify(token, 'beindependence');

    const { sub } = decoded as TokenPayload;

    req.userId = sub;

    return next();
  } catch (error) {
    return res.status(400).json({ message: 'Token nao existe'});
  }
}
