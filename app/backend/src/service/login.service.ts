import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';

class LoginServices {
  static async getLogin(email: string, password: string) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return 'error invalid';
    }
    return user.id.toString();
  }
}

export default LoginServices;
