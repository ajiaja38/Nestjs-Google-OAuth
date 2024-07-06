import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ERole } from 'src/types/enum/ERole.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUserHandler(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<User> {
    return await this.userService.registerNativeUser(
      registerUserDto,
      ERole.ADMIN,
    );
  }
}
