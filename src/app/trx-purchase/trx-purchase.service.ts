import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrxPurchase } from './model/trx-purchase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrxPurchaseService {
  constructor(
    @InjectRepository(TrxPurchase)
    private trxPurchaseRepository: Repository<TrxPurchase>,
  ) {}
}
