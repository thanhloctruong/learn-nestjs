import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AccessAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private _authService: AuthService) {}
  @Get()
  getAllUser() {
    return this._authService.findAllUser();
  }

  @UseGuards(AccessAuthGuard)
  @Get(':id')
  getUser(@Param('id') userId: string, @Request() req): any {
    console.log(req.user);

    return this._authService.findUser(userId);
    // return req.user;
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
