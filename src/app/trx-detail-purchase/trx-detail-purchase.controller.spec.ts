import { Test, TestingModule } from '@nestjs/testing';
import { TrxDetailPurchaseController } from './trx-detail-purchase.controller';
import { TrxDetailPurchaseService } from './trx-detail-purchase.service';

describe('TrxDetailPurchaseController', () => {
  let controller: TrxDetailPurchaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrxDetailPurchaseController],
      providers: [TrxDetailPurchaseService],
    }).compile();

    controller = module.get<TrxDetailPurchaseController>(TrxDetailPurchaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
