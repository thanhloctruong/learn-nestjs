import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/user.service';
import { AccessTokenStrategy } from './access-token.strategy';
import { AuthController } from './auth.controller';
import { AccessAuthGuard } from './auth.guard';
import { UserSchema } from './auth.model';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({ secret: 'ACAN', signOptions: { expiresIn: '2d' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, UsersService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
