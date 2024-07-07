import { Controller } from '@nestjs/common';
import { TrxDetailPurchaseService } from './trx-detail-purchase.service';

@Controller('trx-detail-purchase')
export class TrxDetailPurchaseController {
  constructor(
    private readonly trxDetailPurchaseService: TrxDetailPurchaseService,
  ) {}
}
