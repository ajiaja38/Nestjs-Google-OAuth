import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { Repository } from 'typeorm';
import { IGooglePayload } from 'src/types/interface/IGoolePayload.interface';
import { ERole } from 'src/types/enum/ERole.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getOrCreateUser({
    email,
    name,
    avatar,
  }: IGooglePayload): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: {
        name,
        email,
        avatar,
      },
    });

    if (!user) {
      const newUser: User = await this.userRepository.save({
        name,
        email,
        avatar,
        role: ERole.USER,
      });

      if (!newUser) throw new BadRequestException('User not created');

      return newUser;
    }

    return user;
  }
}
