import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { UserType } from './entities/user-type.entity';

@Injectable()
export class UserTypeService {
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
  ) {}

  public async findAll(description?: string): Promise<UserType[]> {
    const where = {
      description: Like(`${description || ''}%`),
    };

    return this.userTypeRepository.findBy(where);
  }

  public async findById(id: number): Promise<UserType> {
    return this.userTypeRepository.findOneBy({ id });
  }

  public async create(createUserTypeDto: CreateUserTypeDto): Promise<UserType> {
    return this.userTypeRepository.save(createUserTypeDto);
  }

  public async update(
    id: number,
    updateUserTypeDto: UpdateUserTypeDto,
  ): Promise<UserType> {
    await this.userTypeRepository.update({ id }, updateUserTypeDto);

    return this.userTypeRepository.findOneBy({ id });
  }

  public async delete(id: number): Promise<boolean> {
    const { affected } = await this.userTypeRepository.delete({ id });

    return !!affected;
  }
}
