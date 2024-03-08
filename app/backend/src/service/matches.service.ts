import MatchesModel from '../database/models/matches.model';
import teamModel from '../database/models/team.model';

class matchesServices {
  static async getAllMatches() {
    const pesquisa = {};
    const matches = await MatchesModel.findAll({
      where: pesquisa,
      include: [
        { model: teamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: teamModel, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  static async getOneMatches(id: number, home: number, away: number) {
    const matches = await MatchesModel.findByPk(id);
    if (!matches || !matches.inProgress) {
      return false;
    }

    matches.homeTeamGoals = home;
    matches.awayTeamGoals = away;
    await matches.save();
  }

  static async progress(inProgress: string) {
    const matches = await MatchesModel.findAll({ where: { inProgress },
      include: [
        { model: teamModel, as: 'teamHome', attributes: ['teamName'] },
        { model: teamModel, as: 'teamAway', attributes: ['teamName'] },
      ] });
    return matches;
  }

  static async getOneMatchesFinish(id: number): Promise<void | string> {
    const matches = await MatchesModel.findByPk(id);
    if (!matches) {
      return 'partida não encontrada';
    }
    matches.inProgress = false;
    await matches.save();
  }
}

export default matchesServices;
