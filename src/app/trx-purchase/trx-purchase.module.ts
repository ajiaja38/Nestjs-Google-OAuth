import { Module } from '@nestjs/common';
import { TrxPurchaseService } from './trx-purchase.service';
import { TrxPurchaseController } from './trx-purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrxPurchase } from './model/trx-purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrxPurchase])],
  controllers: [TrxPurchaseController],
  providers: [TrxPurchaseService],
})
export class TrxPurchaseModule {}
