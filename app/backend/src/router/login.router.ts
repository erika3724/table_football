import { Router, Request, Response } from 'express';
import loginController from '../controllers/loginControler';
import joiValidateUser from '../middlewares/joiValidateUser';
import joiValidatetoken from '../middlewares/validateToken';

const router = Router();

router.post(
  '/',
  joiValidateUser,
  (req: Request, res:Response) => loginController.getoLogin(req, res),
);
router.get(
  '/role',
  joiValidatetoken,
  (req: Request, res:Response) => loginController.getToken(req, res),
);

export default router;
