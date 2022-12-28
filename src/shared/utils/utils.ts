import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
export class Utils {
  constructor(private _jwtService = JwtService) {}

  static isAuth = () => {};
}
