import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { Repository } from 'typeorm';
import { IGooglePayload } from 'src/types/interface/IGoolePayload.interface';
import { Profile } from 'passport-google-oauth20';
import { TokenManagerService } from '../auth/token-manager.service';
import { ILoginResponse } from '../auth/interface/IAuthResponse.interface';
import { IJwtPayload } from 'src/types/interface/IJwtPayload.interface';
import { MessageService } from '../message/message.service';
import LoginDto from '../auth/dto/login.dto';
import { PasswordConfService } from './password-conf.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { ERole } from 'src/types/enum/ERole.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(forwardRef(() => TokenManagerService))
    private tokenManagerService: TokenManagerService,

    private passwordConfService: PasswordConfService,
    private messageService: MessageService,
  ) {}

  public async getOrCreateUserByGoogleProfile(
    profile: Profile,
  ): Promise<ILoginResponse> {
    const payload: IGooglePayload = {
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
    };

    let user: User;

    user = await this.userRepository.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      user = await this.userRepository.save({
        ...payload,
      });

      if (!user) throw new BadRequestException('User not created');
    }

    const jwtPayload: IJwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    this.messageService.setMessage('User created successfully');

    return {
      accessToken:
        await this.tokenManagerService.generateAccessToken(jwtPayload),
      refreshToken:
        await this.tokenManagerService.generateRefreshToken(jwtPayload),
    };
  }

  public async registerNativeUser(
    { name, email, password }: RegisterUserDto,
    role: ERole,
  ): Promise<User> {
    const user: User = await this.userRepository.save({
      name,
      email,
      password: await this.passwordConfService.hashPassword(password),
      role,
    });

    if (!user) throw new BadRequestException('User not created');

    this.messageService.setMessage('User created successfully');
    return user;
  }

  public async verifyCredentials({
    email,
    password,
  }: LoginDto): Promise<IJwtPayload> {
    const user: User = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestException('Email or password incorrect');

    if (!user.password)
      throw new NotFoundException('You has registered with Google');

    await this.passwordConfService.comparePassword(password, user.password);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  public async findAllUsers(): Promise<User[]> {
    this.messageService.setMessage('Get all users successfully');
    return await this.userRepository.find({
      where: {
        role: ERole.USER,
      },
      select: [
        'id',
        'name',
        'email',
        'role',
        'avatar',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}
