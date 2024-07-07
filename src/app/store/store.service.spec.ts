import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from './store.service';
import { MessageService } from '../message/message.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Store } from './model/store.model';
import { Repository } from 'typeorm';
import { StoreDto } from './dto/Store.dto';
import { NotFoundException } from '@nestjs/common';

describe('StoreService', () => {
  let service: StoreService;
  let storeRepository: Repository<Store>;
  let messageService: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreService,
        MessageService,
        {
          provide: getRepositoryToken(Store),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StoreService>(StoreService);
    storeRepository = module.get<Repository<Store>>(getRepositoryToken(Store));
    messageService = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(storeRepository).toBeDefined();
    expect(messageService).toBeDefined();
  });

  it('should create a store', async () => {
    const storeDto: StoreDto = { name: 'Test Store' };

    const createdStore: Store = {
      id: '1',
      name: storeDto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(storeRepository, 'save').mockResolvedValue(createdStore);
    jest.spyOn(messageService, 'setMessage').mockImplementation();

    const result = await service.createStore(storeDto);

    expect(result).toEqual(createdStore);
    expect(storeRepository.save).toHaveBeenCalledWith(storeDto);
    expect(messageService.setMessage).toHaveBeenCalledWith(
      'Store created successfully',
    );
  });

  it('should find a store by id', async () => {
    const storeId = '1';
    const foundStore: Store = {
      id: storeId,
      name: 'Found Store',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(storeRepository, 'findOne').mockResolvedValue(foundStore);
    jest.spyOn(messageService, 'setMessage').mockImplementation();

    const result = await service.finDetailStore(storeId);

    expect(result).toEqual(foundStore);
    expect(storeRepository.findOne).toHaveBeenCalledWith({
      where: { id: storeId },
    });
    expect(messageService.setMessage).toHaveBeenCalledWith(
      'Get store successfully',
    );
  });

  it('should handle store not found by id', async () => {
    const storeId = '1';

    jest.spyOn(storeRepository, 'findOne').mockResolvedValue(undefined);
    jest.spyOn(messageService, 'setMessage').mockImplementation();

    try {
      await service.finDetailStore(storeId);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual('Store not found');
      expect(storeRepository.findOne).toHaveBeenCalledWith({
        where: { id: storeId },
      });
      expect(messageService.setMessage).toHaveBeenCalledWith(
        'Get store successfully',
      );
    }
  });

  it('should update store name', async () => {
    const storeId = '1';
    const updateDto: StoreDto = { name: 'Updated Store' };
    const updatedStore: Store = {
      id: storeId,
      name: updateDto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(storeRepository, 'save').mockResolvedValue(updatedStore);
    jest.spyOn(messageService, 'setMessage').mockImplementation();

    const result = await service.updateStoreName(storeId, updateDto);

    expect(result).toEqual(updatedStore);
    expect(storeRepository.save).toHaveBeenCalledWith({
      id: storeId,
      name: updateDto.name,
      updatedAt: expect.any(Date),
    });
    expect(messageService.setMessage).toHaveBeenCalledWith(
      'Store updated successfully',
    );
  });
});
