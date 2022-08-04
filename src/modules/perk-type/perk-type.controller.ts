import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PerkType } from './entities/perk-type.entity';
import { PerkTypeService } from './perk-type.service';

@Controller('perk-type')
export class PerkTypeController {
  constructor(private readonly perkTypeService: PerkTypeService) {}

  @Get()
  public async list(
    @Query('description') description?: string,
  ): Promise<PerkType[]> {
    return this.perkTypeService.findAll(description);
  }

  @Get(':id')
  public async find(@Param('id') id: number): Promise<PerkType> {
    return this.perkTypeService.findById(id);
  }

  @Post()
  public async create(
    @Body('description') description: string,
  ): Promise<PerkType> {
    return this.perkTypeService.create(description);
  }

  @Put(':id')
  public async updateDescription(
    @Param('id') id: number,
    @Body('description') description: string,
  ): Promise<PerkType> {
    return this.perkTypeService.update(id, description);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<boolean> {
    return this.perkTypeService.delete(id);
  }
}
