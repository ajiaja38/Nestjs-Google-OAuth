import { Test, TestingModule } from '@nestjs/testing';
import { TrxPurchaseService } from './trx-purchase.service';

describe('TrxPurchaseService', () => {
  let service: TrxPurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrxPurchaseService],
    }).compile();

    service = module.get<TrxPurchaseService>(TrxPurchaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
