import { Router, Request, Response } from 'express';
import validateToken from '../middlewares/validateToken';
import matchesControler from '../controllers/matchesControler';
import verifyCreaty from '../middlewares/verifyCreaty';

const router = Router();

router.get('/', (req: Request, res:Response) =>
  matchesControler.getAllMatches(req, res));
router.patch('/:id', validateToken, (req: Request, res:Response) =>
  matchesControler.getOneMatches(req, res));
router.patch('/:id/finish', validateToken, (req: Request, res:Response) =>
  matchesControler.getOneMatchesFinish(req, res));
router.post('/', validateToken, verifyCreaty, (req: Request, res:Response) =>
  matchesControler.creatMatches(req, res));
export default router;
