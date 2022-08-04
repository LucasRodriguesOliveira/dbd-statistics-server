import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PerkType } from './entities/perk-type.entity';

@Injectable()
export class PerkTypeService {
  constructor(
    @InjectRepository(PerkType)
    private readonly perkTypeRepository: Repository<PerkType>,
  ) {}

  async findAll(description?: string): Promise<PerkType[]> {
    const where = {
      description: Like(`${description || ''}%`),
    };

    return this.perkTypeRepository.findBy(where);
  }

  async findById(id: number): Promise<PerkType> {
    return this.perkTypeRepository.findOneBy({ id });
  }

  async create(description: string): Promise<PerkType> {
    return this.perkTypeRepository.save({ description });
  }

  async update(id: number, description: string): Promise<PerkType> {
    await this.perkTypeRepository.update({ id }, { description });

    return this.perkTypeRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.perkTypeRepository.delete({ id });

    return !!affected;
  }
}
