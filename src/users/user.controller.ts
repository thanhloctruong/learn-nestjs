import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('api/v1/user')
export class UserController {
  constructor(private _userService: UsersService) {}
  @Get()
  getAllUser() {
    return this._userService.findAllUser();
  }
  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this._userService.findUser(userId);
  }

  @Post('create')
  createNewUser(
    @Body('name') userName: string,
    @Body('email') userEmai: string,
    @Body('address') userAddress: string,
    @Body('phoneNumber') userPhone: string,
    @Body('password') userPassword: string,
  ) {
    const result = this._userService.createUser(
      userName,
      userPhone,
      userAddress,
      userEmai,
      userPassword,
    );
    return result;
  }
}
