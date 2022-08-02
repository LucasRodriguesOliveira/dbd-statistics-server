import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserTokenTypeDto } from './dto/create-user-token-type.dto';
import { UpdateUserTokenTypeDto } from './dto/update-user-token-type.dto';
import { UserTokenType } from './entities/user-token-type.entity';

@Injectable()
export class UserTokenTypeService {
  constructor(
    @InjectRepository(UserTokenType)
    private readonly userTokenTypeRepository: Repository<UserTokenType>,
  ) {}

  public async findAll(description?: string): Promise<UserTokenType[]> {
    const where = {
      description: Like(`${description || ''}%`),
    };

    return this.userTokenTypeRepository.findBy(where);
  }

  public async findById(id: number): Promise<UserTokenType> {
    return this.userTokenTypeRepository.findOneBy({ id });
  }

  public async create(
    createUserTokenTypeDto: CreateUserTokenTypeDto,
  ): Promise<UserTokenType> {
    return this.userTokenTypeRepository.save(createUserTokenTypeDto);
  }

  public async update(
    id: number,
    updateUserTokenTypeDto: UpdateUserTokenTypeDto,
  ): Promise<UserTokenType> {
    await this.userTokenTypeRepository.update({ id }, updateUserTokenTypeDto);

    return this.userTokenTypeRepository.findOneBy({ id });
  }

  public async delete(id: number): Promise<boolean> {
    const { affected } = await this.userTokenTypeRepository.delete({ id });
    return !!affected;
  }
}
