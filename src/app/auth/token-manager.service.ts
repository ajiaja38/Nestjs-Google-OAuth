import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstant } from 'src/constant/jwt.constant';
import { IJwtPayload } from 'src/types/interface/IJwtPayload.interface';

@Injectable()
export class TokenManagerService {
  constructor(private jwtService: JwtService) {}

  public async generateAccessToken(iJwtPayload: IJwtPayload): Promise<string> {
    return await this.jwtService.signAsync({ ...iJwtPayload });
  }

  public async generateRefreshToken(iJwtPayload: IJwtPayload): Promise<string> {
    return await this.jwtService.signAsync(
      { ...iJwtPayload },
      { secret: jwtConstant.refreshTokenSecret, expiresIn: '7d' },
    );
  }

  async verifyRefreshToken(refreshToken: string): Promise<string> {
    const { id, email, name, role } = await this.jwtService.verify(
      refreshToken,
      {
        secret: jwtConstant.refreshTokenSecret,
      },
    );

    return await this.generateAccessToken({
      id,
      email,
      name,
      role,
    });
  }
}
