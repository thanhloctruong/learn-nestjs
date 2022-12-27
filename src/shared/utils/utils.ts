import * as jwt from 'jsonwebtoken';

export class Utils {
  static genegateToken = (user: any) => {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      'ACAN_SECRET_KEY',
      {
        expiresIn: '30d',
      },
    );
  };

  static isAuth = () => {};
}
