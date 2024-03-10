import { Request, Response } from 'express';
import board from '../service/board.service';

const err = 'Internal Server Error';

class boardontroller {
  static async getGame(req: Request, res: Response) {
    try {
      const response = await board.getGameAll();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: err });
    }
  }

  static async getGameHome(req: Request, res: Response) {
    try {
      const response = await board.getGamehome();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: err });
    }
  }

  static async getGameAway(req: Request, res: Response) {
    try {
      const response = await board.getGameAway();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: err });
    }
  }
}

export default boardontroller;
