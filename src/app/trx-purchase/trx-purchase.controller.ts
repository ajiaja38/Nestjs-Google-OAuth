import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TrxPurchaseService } from './trx-purchase.service';
import { CreateTransactionDto } from './dto/createTrx.dto';
import { User } from 'src/decorator/User.decorator';
import { IJwtPayload } from 'src/types/interface/IJwtPayload.interface';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/Roles.decorator';
import { ERole } from 'src/types/enum/ERole.enum';
import { ITrxDetailResponse } from './interface/TrxResponse.interface';

@Controller('trx-purchase')
@UseGuards(JwtAuthGuard, RoleGuard)
export class TrxPurchaseController {
  constructor(private readonly trxPurchaseService: TrxPurchaseService) {}

  @Post()
  @Roles(ERole.USER)
  async createTransactionHandler(
    @Body() createTransactionDto: CreateTransactionDto,
    @User() user: IJwtPayload,
  ): Promise<ITrxDetailResponse> {
    return this.trxPurchaseService.createTransaction(
      user.id,
      createTransactionDto,
    );
  }
}
