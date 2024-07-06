import { Module } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleController } from './motorcycle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Motorcycle } from './model/motorcycle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Motorcycle])],
  controllers: [MotorcycleController],
  providers: [MotorcycleService],
})
export class MotorcycleModule {}
