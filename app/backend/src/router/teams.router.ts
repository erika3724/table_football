import { Router, Request, Response } from 'express';
import teamController from '../controllers/teamController';

const router = Router();

router.get('/', (req: Request, res:Response) => teamController.getAllTeams(req, res));
router.get('/:id', (req: Request, res:Response) => teamController.getOneTeams(req, res));

export default router;
