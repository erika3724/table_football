import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/user.model';

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const secretKey = process.env.SECRET_KEY || 'jwt_secret';
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const decodedToken = jwt.verify(token, secretKey) as string;
  if (!decodedToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  const response = await UserModel.findByPk(decodedToken);
  if (!response) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  console.log(response.dataValues);

  req.body.role = response.role;
  next();
};

export default validateToken;
