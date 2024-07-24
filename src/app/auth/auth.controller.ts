import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from 'src/guard/Google.auth.guard';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import {
  ILoginResponse,
  IRefreshAccessTokenResponse,
} from './interface/IAuthResponse.interface';
import { RefreshTokenDto } from './dto/refreshtoken.dto';
import LoginDto from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  protected async redirectWithGoogleHandler(
    @Req() req: any,
    @Res() res: Response,
  ): Promise<void> {
    const loginResponse: ILoginResponse =
      await this.userService.getOrCreateUserByGoogleProfile(req.user);

    res.cookie('accessToken', loginResponse.accessToken, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.cookie('refreshToken', loginResponse.refreshToken, {
      httpOnly: true,
      maxAge: 604800000,
    });

    res.redirect('http://localhost:3000/api/v1');
  }

  @Post('login')
  protected async loginHandler(
    @Body() loginDto: LoginDto,
  ): Promise<ILoginResponse> {
    return await this.authService.login(loginDto);
  }

  @Put('refreshToken')
  protected async refreshTokenHandler(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<IRefreshAccessTokenResponse> {
    return await this.authService.refreshToken(refreshTokenDto);
  }
}
