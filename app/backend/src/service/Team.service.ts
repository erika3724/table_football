import TeamModel from '../database/models/team.model';

class TeamServices {
  static async getAllTeams() {
    const teams = await TeamModel.findAll();
    return teams;
  }

  static async getTeam(id: number) {
    const team = await TeamModel.findByPk(id);
    return team;
  }
}

export default TeamServices;
