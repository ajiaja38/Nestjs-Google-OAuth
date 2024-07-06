import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MotorcycleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;
}
