import { calculateAwayTeamScoreboard,
  calculateHomeTeamScoreboard,
  calculateOverallScoreboard, sortScoreboards } from '../middlewares/statics';
import getall from './Team.service';
import finnish from './matches.service';

interface matcha {
  id: number,
  homeTeamId:number,
  awayTeamId:number,
  homeTeamGoals:number,
  awayTeamGoals:number,
  inProgress:boolean
}
class BoardServices {
  private static match(matches: matcha[]): matcha[] {
    return matches.map((m) => (
      { id: m.id,
        homeTeamId: m.homeTeamId,
        homeTeamGoals: m.homeTeamGoals,
        awayTeamId: m.awayTeamId,
        awayTeamGoals: m.awayTeamGoals,
        inProgress: m.inProgress,
      }
    ));
  }

  static async getGamehome() {
    const teams = await getall.getAllTeams();
    const matches = await finnish.getMatchesInProgress('false');
    const completedMatches = matches.filter((match) => !match.inProgress);
    const a = this.match(completedMatches);
    const results = teams.map((t) => calculateHomeTeamScoreboard(t, a));
    const respostarSortida = await sortScoreboards(results);
    return respostarSortida;
  }

  static async getGameAway() {
    const teams = await getall.getAllTeams();
    const matches = await finnish.getMatchesInProgress('false');
    const completedMatches = matches.filter((match) => !match.inProgress);
    const a = this.match(completedMatches);
    const results = teams.map((t) => calculateAwayTeamScoreboard(t, a));
    const respostarSortida = await sortScoreboards(results);
    return respostarSortida;
  }

  static async getGameAll() {
    const t = await getall.getAllTeams();
    const matches = await finnish.getMatchesInProgress('false');
    const a = this.match(matches);
    const results = await calculateOverallScoreboard(t, a);
    const respostarSortida = await sortScoreboards(results);
    return respostarSortida;
  }
}

export default BoardServices;
