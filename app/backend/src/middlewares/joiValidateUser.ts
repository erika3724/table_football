import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');
import * as bcrypt from 'bcryptjs';
import user from '../database/models/user.model';

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validate = async (req : Request, res: Response, next: NextFunction) => {
  const { error } = await loginSchema.validate(req.body);
  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
  const a = await emailRegex.test(req.body.email);
  if (error) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const b = await user.findOne({ where: { email: req.body.email } });

  if (b === null || a === false || req.body.password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const m = await bcrypt.compare(req.body.password, b.dataValues.password);
  if (m === false) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validate;
