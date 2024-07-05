import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordConfService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    passwordPayload: string,
    userPassword: string,
  ): Promise<void> {
    const isMatch: boolean = await bcrypt.compare(
      passwordPayload,
      userPassword,
    );

    if (!isMatch) throw new BadRequestException('Email or password incorrect');
  }
}
