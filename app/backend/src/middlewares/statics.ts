import times from '../Interfaces/ITeams';

interface partidas {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

interface board {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}

const table = (): board => ({
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});
interface points {
  points: number,
  victory: number,
  draw: number,
  losse: number
}

const calculateMatchResult = (teamGoals: number, opponentGoals: number): points => {
  if (teamGoals < opponentGoals) {
    return { points: 0, victory: 0, draw: 0, losse: 1 };
  }
  if (teamGoals > opponentGoals) {
    return { points: 3, victory: 1, draw: 0, losse: 0 };
  }
  const a = { points: 1, victory: 0, draw: 1, losse: 0 };
  return a;
};

const calculateHomeTeamScoreboard = (Times: times, Partidas: partidas[]): board => {
  const res = table();
  res.name = Times.teamName;
  Partidas.forEach((m) => {
    if (Times.id === m.homeTeamId) {
      const response = calculateMatchResult(m.homeTeamGoals, m.awayTeamGoals);
      res.goalsFavor += m.homeTeamGoals;
      res.goalsOwn += m.awayTeamGoals;
      res.totalPoints += response.points;
      res.totalGames += 1;
      res.totalVictories += response.victory;
      res.totalDraws += response.draw;
      res.totalLosses += response.losse;
    }
  });
  res.goalsBalance = res.goalsFavor - res.goalsOwn;
  res.efficiency = Number(((res.totalPoints / (res.totalGames * 3)) * 100).toFixed(2));
  return res;
};

const calculateAwayTeamScoreboard = (Times: times, Partidas: partidas[]): board => {
  const res = table();
  res.name = Times.teamName;
  Partidas.forEach((m) => {
    if (Times.id === m.awayTeamId) {
      const response = calculateMatchResult(m.awayTeamGoals, m.homeTeamGoals);
      res.goalsFavor += m.awayTeamGoals;
      res.goalsOwn += m.homeTeamGoals;
      res.totalPoints += response.points;
      res.totalGames += 1;
      res.totalVictories += response.victory;
      res.totalDraws += response.draw;
      res.totalLosses += response.losse;
    }
  });
  res.goalsBalance = res.goalsFavor - res.goalsOwn;
  res.efficiency = Number(((res.totalPoints / (res.totalGames * 3)) * 100).toFixed(2));
  return res;
};

const calculateOverallScoreboard = (teams: times[], matches: partidas[]): board[] => teams
  .map((team) => {
    const h = calculateHomeTeamScoreboard(team, matches);
    const a = calculateAwayTeamScoreboard(team, matches);
    const res = {
      name: team.teamName,
      totalPoints: h.totalPoints + a.totalPoints,
      totalGames: h.totalGames + a.totalGames,
      totalVictories: h.totalVictories + a.totalVictories,
      goalsOwn: h.goalsOwn + a.goalsOwn,
      goalsBalance: (h.goalsFavor + a.goalsFavor) - (h.goalsOwn + a.goalsOwn),
      totalDraws: h.totalDraws + a.totalDraws,
      totalLosses: h.totalLosses + a.totalLosses,
      goalsFavor: h.goalsFavor + a.goalsFavor,
      efficiency: Number((((h.totalPoints + a.totalPoints)
       / ((h.totalGames + a.totalGames) * 3)) * 100).toFixed(2)),
    };
    return res;
  });

const sortScoreboards = (scoreboards: board[]):board[] => scoreboards.sort((a, b) =>
  b.totalPoints - a.totalPoints
  || b.totalVictories - a.totalVictories
  || b.goalsBalance - a.goalsBalance
  || b.goalsFavor - a.goalsFavor
  || b.efficiency - a.efficiency);

export {
  calculateMatchResult,
  calculateHomeTeamScoreboard,
  sortScoreboards,
  calculateAwayTeamScoreboard,
  calculateOverallScoreboard,
};
