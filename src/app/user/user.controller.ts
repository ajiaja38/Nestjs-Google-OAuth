import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ERole } from 'src/types/enum/ERole.enum';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { Roles } from 'src/decorator/Roles.decorator';
import { RoleGuard } from 'src/guard/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  protected async registerUserHandler(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<User> {
    return await this.userService.registerNativeUser(
      registerUserDto,
      ERole.USER,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ERole.ADMIN, ERole.USER)
  protected async findAllUsersHandler(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }
}
