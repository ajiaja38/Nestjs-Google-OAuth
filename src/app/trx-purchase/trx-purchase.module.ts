import { Module } from '@nestjs/common';
import { TrxPurchaseService } from './trx-purchase.service';
import { TrxPurchaseController } from './trx-purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrxPurchase } from './model/trx-purchase.entity';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';
import { Motorcycle } from '../motorcycle/model/motorcycle.entity';
import { TrxDetailPurchase } from '../trx-detail-purchase/model/trx-detail-purchase.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrxPurchase, TrxDetailPurchase, Motorcycle]),
    UserModule,
    MessageModule,
  ],
  controllers: [TrxPurchaseController],
  providers: [TrxPurchaseService],
})
export class TrxPurchaseModule {}
