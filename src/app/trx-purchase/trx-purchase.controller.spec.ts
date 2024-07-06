import { Test, TestingModule } from '@nestjs/testing';
import { TrxPurchaseController } from './trx-purchase.controller';
import { TrxPurchaseService } from './trx-purchase.service';

describe('TrxPurchaseController', () => {
  let controller: TrxPurchaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrxPurchaseController],
      providers: [TrxPurchaseService],
    }).compile();

    controller = module.get<TrxPurchaseController>(TrxPurchaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
