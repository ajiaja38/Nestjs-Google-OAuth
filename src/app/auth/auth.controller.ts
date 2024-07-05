import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/guard/Google.auth.guard';

@Controller('auth')
export class AuthController {
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  protected async redirectWithGoogleHandler(@Req() req): Promise<any> {
    return req.user;
  }
}
