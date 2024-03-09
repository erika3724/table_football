import UserModel from '../database/models/user.model';

class LoginServices {
  static async getLogin(email: string) {
    const user = await UserModel.findOne({ where: { email } });

    return user?.dataValues.id.toString();
  }
}

export default LoginServices;
