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
    const matches = await Match.update(
      { homeTeamGoals, awayTeamGoals },
      {
        where: {
          id,
          inProgress: true,
        },
      },
    );
    if (matches[0] === 0) {
      return false;
    }

    return matches;
  }

  static async getMatchesInProgress(progress: string) {
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

  static async creatMatch(
    homeTeamId:number,
    awayTeamId:number,
    homeTeamGoals:number,
    awayTeamGoals:number,
  ) {
    const matches = await Match.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
    return matches;
  }
}

export default MatchesServices;
