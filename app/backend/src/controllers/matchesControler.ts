import { Request, Response } from 'express';
import matches from '../service/matches.service';

class matchesController {
  static async getAllMatches(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      if (inProgress === 'true' || inProgress === 'false') {
        const progress = await matches.getMatchesInProgress(inProgress);
        return res.status(200).json(progress);
      }
      const teams = await matches.getAllMatches();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async getOneMatches(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const response = await matches.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
      if (response === false) {
        return res.status(400).json({ message: 'Match not found or is not in progress' });
      }
      return res.status(200).json({ message: response });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async getOneMatchesFinish(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await matches.finishMatch(Number(id));
      if (response === 'partida não encontrada') {
        return res.status(400).json({ message: 'Match not found' });
      }
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  static async creatMatches(req: Request, res: Response) {
    try {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
      const response = await matches
        .creatMatch(Number(homeTeamId), Number(awayTeamId), homeTeamGoals, awayTeamGoals);
      return res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

export default matchesController;
