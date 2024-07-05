import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [GoogleModule, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
