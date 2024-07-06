import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrxDetailPurchase } from './model/trx-detail-purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrxDetailPurchaseService {
  constructor(
    @InjectRepository(TrxDetailPurchase)
    private trxDetailPurchaseRepository: Repository<TrxDetailPurchase>,
  ) {}
}
