import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthService } from './auth.service';
import { TokenManagerService } from './token-manager.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/constant/jwt.constant';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstant.accessTokenSecret,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UserModule),
    MessageModule,
  ],
  controllers: [AuthController],
  providers: [GoogleStrategy, JwtStrategy, AuthService, TokenManagerService],
  exports: [TokenManagerService],
})
export class AuthModule {}
