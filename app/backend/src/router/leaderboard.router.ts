import { Router, Request, Response } from 'express';
import boardontroller from '../controllers/boardontroller';

const router = Router();

router.get('/', (req: Request, res:Response) => boardontroller.getGame(req, res));

router.get('/home', (req: Request, res:Response) => boardontroller.getGameHome(req, res));

router.get('/away', (req: Request, res:Response) => boardontroller.getGameAway(req, res));

export default router;
