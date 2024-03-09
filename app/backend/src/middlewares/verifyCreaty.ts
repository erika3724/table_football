import { Request, Response, NextFunction } from 'express';
import TeamModel from '../database/models/team.model';

const verifyCreaty = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeamId, awayTeamId } = req.body;
    const home = await TeamModel.findByPk(homeTeamId);
    const away = await TeamModel.findByPk(awayTeamId);
    if (!home || !away) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }
    if (home.dataValues.teamName === away.dataValues.teamName) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

export default verifyCreaty;
