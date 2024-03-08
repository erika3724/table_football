import { Model, DataTypes } from 'sequelize';
import db from './index';
import time from './team.model';

class Match extends Model {
  public id!: number;
  public homeTeamId!: number;
  public awayTeamId!: number;
  public homeTeamGoals!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Match.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  homeTeamId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Teams',
      key: 'id',
    },
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  sequelize: db,
  tableName: 'matches',
  modelName: 'Match',
});

time.hasMany(
  Match,
  {
    foreignKey: 'awayTeamId', as: 'AwayMatches',
  },
);
time.hasMany(
  Match,
  {
    foreignKey: 'homeTeamId', as: 'HomeMatches',
  },
);
Match.belongsTo(
  time,
  {
    foreignKey: 'awayTeamId', as: 'awayTeam',
  },
);
Match.belongsTo(
  time,
  {
    foreignKey: 'homeTeamId', as: 'homeTeam',
  },
);

export default Match;
