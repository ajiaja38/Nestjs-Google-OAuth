import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Motorcycle } from './model/motorcycle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MotorcycleService {
  constructor(
    @InjectRepository(Motorcycle)
    private motorcycleRepository: Repository<Motorcycle>,
  ) {}
}
