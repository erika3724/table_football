import * as jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'jwt_secret';

function generateToken(userid: string): string {
  const token = jwt.sign(userid, secretKey);
  return token;
}

export default generateToken;
