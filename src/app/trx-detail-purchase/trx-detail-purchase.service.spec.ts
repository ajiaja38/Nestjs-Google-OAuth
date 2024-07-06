import { Test, TestingModule } from '@nestjs/testing';
import { TrxDetailPurchaseService } from './trx-detail-purchase.service';

describe('TrxDetailPurchaseService', () => {
  let service: TrxDetailPurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrxDetailPurchaseService],
    }).compile();

    service = module.get<TrxDetailPurchaseService>(TrxDetailPurchaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
