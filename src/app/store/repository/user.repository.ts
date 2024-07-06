import { Repository } from 'typeorm';
import { Store } from '../model/store.model';

export interface StoreRepository extends Repository<Store> {}
