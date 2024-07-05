import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { AuthModule } from '../auth/auth.module';
import { MessageModule } from '../message/message.module';
import { PasswordConfService } from './password-conf.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    MessageModule,
  ],
  controllers: [UserController],
  providers: [UserService, PasswordConfService],
  exports: [UserService],
})
export class UserModule {}
