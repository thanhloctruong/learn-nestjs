import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Utils } from 'src/shared/utils/utils';
import { UsersService } from 'src/users/user.service';
import { User } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly _UserModel: Model<User>,
    private _userService: UsersService,
    private _JwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    try {
      const isUser = await this._UserModel.findOne({ email: email });
      if (isUser) {
        if (bcrypt.compareSync(password, isUser.password)) {
          const payload = {
            name: isUser.name,
            sub: isUser._id,
            mail: isUser.email,
          };
          return {
            _id: isUser._id,
            name: isUser.name,
            email: isUser.email,
            token: this._JwtService.sign(payload),
          };
        } else {
          throw new HttpException(
            'User with that email is not exists',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } catch (error) {
      throw new HttpException('Error signin methob', HttpStatus.BAD_REQUEST);
    }
  }
  public async validateUser(payload: any) {
    const user = await this._userService.findUser(payload.email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async signUp(
    email: string,
    password: string,
    address: string,
    name: string,
    phoneNumber: string,
  ) {
    try {
      const newUser = new this._UserModel({
        name,
        phoneNumber,
        address,
        email,
        password: bcrypt.hashSync(password, 8),
      });
      const result = await newUser.save();
      const payload = {
        name: result.name,
        sub: result._id,
        mail: result.email,
      };
      const response = {
        userData: result,
        token: this._JwtService.sign(payload),
      };
      return response;
    } catch (error) {
      throw new HttpException('Error signin methob', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllUser() {
    return await this._UserModel.find({});
  }

  async findUser(id: string) {
    return await this._UserModel.findById(id);
  }
}
