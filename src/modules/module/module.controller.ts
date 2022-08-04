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
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module } from './entities/module.entity';
import { ModuleService } from './module.service';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get()
  public async findAll(
    @Query('description') description: string,
  ): Promise<Module[]> {
    return this.moduleService.findAll(description);
  }

  @Get(':id')
  public async findById(@Param('id') id: number): Promise<Module> {
    return this.moduleService.findById(id);
  }

  @Post()
  public async create(
    @Body() createModuleDto: CreateModuleDto,
  ): Promise<Module> {
    return this.moduleService.create(createModuleDto);
  }

  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() updateModuleDto: UpdateModuleDto,
  ): Promise<Module> {
    return this.moduleService.update(id, updateModuleDto);
  }

  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<boolean> {
    return this.moduleService.delete(id);
  }
}
