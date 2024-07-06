import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './model/store.model';
import { MessageService } from '../message/message.service';
import { StoreRepository } from './repository/user.repository';
import { StoreDto } from './dto/Store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: StoreRepository,
    private messageService: MessageService,
  ) {}

  public async createStore({ name }: StoreDto): Promise<Store> {
    const store: Store = await this.storeRepository.save({ name });
    this.messageService.setMessage('Store created successfully');
    return store;
  }

  public async finDetailStore(id: string): Promise<Store> {
    const store: Store = await this.storeRepository.findOne({ where: { id } });

    this.messageService.setMessage('Get store successfully');
    return store;
  }

  public async updateStoreName(id: string, { name }: StoreDto): Promise<Store> {
    const store: Store = await this.storeRepository.save({
      id,
      name,
      updatedAt: new Date(),
    });
    this.messageService.setMessage('Store updated successfully');
    return store;
  }
}
