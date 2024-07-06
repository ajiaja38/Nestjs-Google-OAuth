import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Motorcycle } from './model/motorcycle.entity';
import { Repository } from 'typeorm';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { from, Observable, switchMap } from 'rxjs';
import { MessageService } from '../message/message.service';

@Injectable()
export class MotorcycleService {
  constructor(
    @InjectRepository(Motorcycle)
    private motorcycleRepository: Repository<Motorcycle>,

    private messageService: MessageService,
  ) {}

  public createMotorcycle(
    motorcycleDto: MotorcycleDto,
  ): Observable<Motorcycle> {
    this.messageService.setMessage('Motorcycle created successfully');
    return from(this.motorcycleRepository.save({ ...motorcycleDto }));
  }

  public findAllMotorcycles(): Observable<Motorcycle[]> {
    this.messageService.setMessage('Get all motorcycles successfully');
    return from(
      this.motorcycleRepository.find({ where: { isDeleted: false } }),
    );
  }

  public findMotorcycleById(id: string): Observable<Motorcycle> {
    return from(this.motorcycleRepository.findOneBy({ id })).pipe(
      switchMap((motorcycle: Motorcycle) => {
        if (!motorcycle) throw new NotFoundException('Motorcycle not found');

        this.messageService.setMessage('Get motorcycle successfully');
        return from([motorcycle]);
      }),
    );
  }

  public updateMotorcycle(
    id: string,
    motorcycleDto: MotorcycleDto,
  ): Observable<Motorcycle> {
    return from(this.motorcycleRepository.findOneBy({ id })).pipe(
      switchMap((motorcycle: Motorcycle) => {
        if (!motorcycle) throw new NotFoundException('Motorcycle not found');

        return from(
          this.motorcycleRepository.save({ id, ...motorcycleDto }),
        ).pipe(
          switchMap((motorcycle: Motorcycle) => {
            if (!motorcycle)
              throw new BadRequestException('Motorcycle not updated');

            this.messageService.setMessage('Motorcycle updated successfully');

            return from([motorcycle]);
          }),
        );
      }),
    );
  }

  public softDeleteMotorcycle(id: string): Observable<void> {
    return from(this.motorcycleRepository.save({ id, isDeleted: true })).pipe(
      switchMap((deletedResult: Motorcycle) => {
        if (!deletedResult) {
          throw new NotFoundException('Motorcycle not found');
        }
        this.messageService.setMessage('Motorcycle deleted successfully');

        return from([void 0]);
      }),
    );
  }
}
