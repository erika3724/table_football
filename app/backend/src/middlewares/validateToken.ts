import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const secretKey = process.env.SECRET_KEY || 'jwt_secret';
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const decodedToken = jwt.verify(token, secretKey) as JwtPayload;
  if (decodedToken.error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default validateToken;
