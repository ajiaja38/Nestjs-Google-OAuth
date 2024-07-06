import { Controller } from '@nestjs/common';
import { TrxPurchaseService } from './trx-purchase.service';

@Controller('trx-purchase')
export class TrxPurchaseController {
  constructor(private readonly trxPurchaseService: TrxPurchaseService) {}
}
