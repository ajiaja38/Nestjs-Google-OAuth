import { Module } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleController } from './motorcycle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motorcycle } from './model/motorcycle.entity';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([Motorcycle]), MessageModule],
  controllers: [MotorcycleController],
  providers: [MotorcycleService],
  exports: [MotorcycleService],
})
export class MotorcycleModule {}
