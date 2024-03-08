import TeamModel from '../database/models/team.model';

class TeamServices {
  static async getAllTeams() {
    const teams = await TeamModel.findAll();
    return teams;
  }
}

export default TeamServices;
