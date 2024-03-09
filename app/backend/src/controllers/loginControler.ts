import { Request, Response } from 'express';
import jwt from '../middlewares/jwt';
import login from '../service/login.service';

class loginController {
  static async getoLogin(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const response = await login.getLogin(email);
      const code = jwt(response as string);
      res.status(200).json({ token: code });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getToken(req: Request, res: Response) {
    return res.status(200).json({ role: req.body.role });
  }
}

export default loginController;
