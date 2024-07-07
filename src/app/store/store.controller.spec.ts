import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { MessageService } from '../message/message.service';

describe('StoreController', () => {
  let controller: StoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [StoreService, MessageService],
    }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
