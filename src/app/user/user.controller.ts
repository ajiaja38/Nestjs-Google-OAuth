import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ERole } from '../../types/enum/ERole.enum';
import { JwtAuthGuard } from '../../guard/jwt.auth.guard';
import { Roles } from '../../decorator/Roles.decorator';
import { RoleGuard } from '../../guard/role.guard';

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
