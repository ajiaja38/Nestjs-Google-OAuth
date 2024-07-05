import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { UserModule } from 'src/app/user/user.module';

@Module({
  imports: [UserModule],
  providers: [GoogleService, GoogleStrategy],
  exports: [GoogleService],
})
export class GoogleModule {}
