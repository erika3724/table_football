import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import * as bcrypt from 'bcryptjs';
import user from '../database/models/user.model';

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const validate = async (req : Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
  const a = emailRegex.test(req.body.email);
  if (error || a === false) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  next();
};

export default validate;
