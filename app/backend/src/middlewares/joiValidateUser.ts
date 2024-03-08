import { Request, Response, NextFunction } from 'express';

import Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validate = (req : Request, res: Response, next: NextFunction) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export default validate;
