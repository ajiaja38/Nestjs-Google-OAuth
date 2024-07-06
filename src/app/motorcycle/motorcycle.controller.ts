import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MotorcycleService } from './motorcycle.service';
import { MotorcycleDto } from './dto/motorcycle.dto';
import { Observable } from 'rxjs';
import { Motorcycle } from './model/motorcycle.entity';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/Roles.decorator';
import { ERole } from 'src/types/enum/ERole.enum';

@Controller('motorcycle')
@UseGuards(JwtAuthGuard, RoleGuard)
export class MotorcycleController {
  constructor(private readonly motorcycleService: MotorcycleService) {}

  @Post()
  @Roles(ERole.ADMIN)
  protected createMotorcycleHandler(
    @Body() motorcycleDto: MotorcycleDto,
  ): Observable<Motorcycle> {
    return this.motorcycleService.createMotorcycle(motorcycleDto);
  }

  @Get()
  @Roles(ERole.ADMIN, ERole.USER)
  protected findAllMotorcyclesHandler(): Observable<Motorcycle[]> {
    return this.motorcycleService.findAllMotorcycles();
  }

  @Get(':id')
  @Roles(ERole.ADMIN, ERole.USER)
  protected findMotorcycleByIdHandler(
    @Param('id') id: string,
  ): Observable<Motorcycle> {
    return this.motorcycleService.findMotorcycleById(id);
  }

  @Put(':id')
  @Roles(ERole.ADMIN)
  protected updateMotorcycleHandler(
    @Param('id') id: string,
    @Body() motorcycleDto: MotorcycleDto,
  ): Observable<Motorcycle> {
    return this.motorcycleService.updateMotorcycle(id, motorcycleDto);
  }

  @Delete(':id')
  @Roles(ERole.ADMIN)
  protected softDeleteMotorcycleHandler(
    @Param('id') id: string,
  ): Observable<void> {
    return this.motorcycleService.softDeleteMotorcycle(id);
  }
}
