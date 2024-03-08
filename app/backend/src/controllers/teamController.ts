import { Request, Response } from 'express';
import Team from '../service/Team.service';

class teamController {
  static async getAllTeams(_req_: Request, res: Response) {
    try {
      const teams = await Team.getAllTeams();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default teamController;
