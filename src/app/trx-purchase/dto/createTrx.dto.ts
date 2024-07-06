import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ListOfProductsDto {
  @IsString()
  @IsNotEmpty()
  motorcycleId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class CreateTransactionDto {
  @IsArray()
  @IsNotEmpty()
  listOfProducts: ListOfProductsDto[];

  @IsNumber()
  @IsNotEmpty()
  userBalance: number;
}
