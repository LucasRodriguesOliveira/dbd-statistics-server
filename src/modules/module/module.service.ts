import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module } from './entities/module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
  ) {}

  public async findAll(description?: string): Promise<Module[]> {
    const where = {
      description: Like(`${description || ''}%`),
    };

    return this.moduleRepository.findBy(where);
  }

  public async findById(id: number): Promise<Module> {
    return this.moduleRepository.findOneBy({ id });
  }

  public async create(createModuleDto: CreateModuleDto): Promise<Module> {
    return this.moduleRepository.save(createModuleDto);
  }

  public async update(
    id: number,
    updateModuleDto: UpdateModuleDto,
  ): Promise<Module> {
    await this.moduleRepository.update({ id }, updateModuleDto);

    return this.moduleRepository.findOneBy({ id });
  }

  public async delete(id: number): Promise<boolean> {
    const { affected } = await this.moduleRepository.delete({ id });

    return !!affected;
  }
}
