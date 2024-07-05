import { IsNotEmpty, IsString } from 'class-validator';

export default class LoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
