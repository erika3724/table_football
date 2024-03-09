import Match from '../database/models/matches.model';
import Team from '../database/models/team.model';

class MatchesServices {
  static async getAllMatches() {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });
    return matches;
  }

  static async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const matches = await Match.findByPk(id);
    if (!matches || !matches.inProgress) {
      return false;
    }

    matches.homeTeamGoals = homeTeamGoals;
    matches.awayTeamGoals = awayTeamGoals;
    await matches.save();
    return true;
  }

  static async getMatchesInProgress(progress: string) {
    console.log(progress);
    const arruma = progress === 'true';
    const matches = await Match.findAll({
      where: { inProgress: arruma },
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });
    return matches;
  }

  static async finishMatch(id: number): Promise<string | void> {
    const matches = await Match.findByPk(id);
    if (!matches) {
      return 'Partida não encontrada';
    }
    matches.inProgress = false;
    await matches.save();
  }
}

export default MatchesServices;
