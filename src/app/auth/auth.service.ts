import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refreshtoken.dto';
import { TokenManagerService } from './token-manager.service';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';
import LoginDto from './dto/login.dto';
import { ILoginResponse } from './interface/IAuthResponse.interface';
import { IJwtPayload } from 'src/types/interface/IJwtPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,

    private tokenManagerService: TokenManagerService,
    private messageService: MessageService,
  ) {}

  public async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const jwtPayload: IJwtPayload =
      await this.userService.verifyCredentials(loginDto);

    this.messageService.setMessage('Login Successfully');
    return {
      accessToken:
        await this.tokenManagerService.generateAccessToken(jwtPayload),
      refreshToken:
        await this.tokenManagerService.generateRefreshToken(jwtPayload),
    };
  }

  public async refreshToken(
    refreshTokenDto: RefreshTokenDto,
  ): Promise<{ accessToken: string }> {
    this.messageService.setMessage('Refresh Token Successfully');

    return {
      accessToken: await this.tokenManagerService.verifyRefreshToken(
        refreshTokenDto.refreshToken,
      ),
    };
  }
}
