import { Module } from '@nestjs/common';
import { TrxDetailPurchaseService } from './trx-detail-purchase.service';
import { TrxDetailPurchaseController } from './trx-detail-purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrxDetailPurchase } from './model/trx-detail-purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrxDetailPurchase])],
  controllers: [TrxDetailPurchaseController],
  providers: [TrxDetailPurchaseService],
})
export class TrxDetailPurchaseModule {}
