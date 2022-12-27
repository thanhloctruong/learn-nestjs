import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}
  @Get()
  getAllUser() {
    return this._authService.findAllUser();
  }
  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this._authService.findUser(userId);
  }

  @Post('signin')
  signIn(
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  ) {
    const result = this._authService.signIn(userEmail, userPassword);
    return result;
  }

  @Post('signup')
  signUp(
    @Body('name') userName: string,
    @Body('email') userEmai: string,
    @Body('address') userAddress: string,
    @Body('phoneNumber') userPhone: string,
    @Body('password') userPassword: string,
  ) {
    const result = this._authService.signUp(
      userName,
      userPhone,
      userAddress,
      userEmai,
      userPassword,
    );
    return result;
  }
}
