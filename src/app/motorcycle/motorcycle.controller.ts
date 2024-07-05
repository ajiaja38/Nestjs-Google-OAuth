import { Controller } from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';

@Controller('motorcycle')
export class MotorcycleController {
  constructor(private readonly motorcycleService: MotorcycleService) {}
}
