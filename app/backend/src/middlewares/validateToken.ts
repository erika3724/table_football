import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';

const e = 'Token must be a valid token';
const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const secretKey = process.env.SECRET_KEY || 'jwt_secret';

    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const decodedToken = jwt.verify(req.headers.authorization.split(' ')[1], secretKey) as string;
    if (!decodedToken) {
      return res.status(401).json({ message: e });
    }
    const response = await UserModel.findByPk(decodedToken);
    if (!response) {
      return res.status(401).json({ message: e });
    }
    req.body.role = response.role;
    next();
  } catch (error) {
    res.status(401).json({ message: e });
  }
};

export default validateToken;
