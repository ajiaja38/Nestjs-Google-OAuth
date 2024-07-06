import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { Store } from './model/store.model';
import { StoreDto } from './dto/Store.dto';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorator/Roles.decorator';
import { ERole } from 'src/types/enum/ERole.enum';

@Controller('store')
@UseGuards(JwtAuthGuard, RoleGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @Roles(ERole.ADMIN)
  protected async createStore(@Body() storeDto: StoreDto): Promise<Store> {
    return await this.storeService.createStore(storeDto);
  }

  @Get(':id')
  @Roles(ERole.ADMIN, ERole.USER)
  protected async finDetailStore(@Param('id') id: string): Promise<Store> {
    return await this.storeService.finDetailStore(id);
  }

  @Put(':id')
  @Roles(ERole.ADMIN)
  protected async updateStoreName(
    @Param('id') id: string,
    @Body() storeDto: StoreDto,
  ): Promise<Store> {
    return await this.storeService.updateStoreName(id, storeDto);
  }
}
