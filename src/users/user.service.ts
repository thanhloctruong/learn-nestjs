import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly _UserModel: Model<User>) {}
  async createUser(
    name: string,
    phoneNumber: string,
    address: string,
    email: string,
    password: string,
  ) {
    const newUser = new this._UserModel({
      name,
      phoneNumber,
      address,
      email,
      password,
    });
    const result = await newUser.save();
    return result;
  }

  async findAllUser() {
    return await this._UserModel.find({});
  }

  async findUser(id: string) {
    return await this._UserModel.findById(id);
  }
}
