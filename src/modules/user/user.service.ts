import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserTokenTypeService } from '../user-token-type/user-token-type.service';
import { UserTokenService } from '../user-token/user-token.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userTokenService: UserTokenService,
    private readonly userTokenTypeService: UserTokenTypeService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(name?: string): Promise<User[]> {
    const where = {
      name: Like(`${name || ''}%`),
    };

    return this.userRepository.findBy(where);
  }

  public async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(createUserDto);
    const [tokenType] = await this.userTokenTypeService.findAll(
      'E-mail confirmation',
    );

    await this.userTokenService.create({
      userId: user.id,
      tokenTypeId: tokenType.id,
    });
    return user;
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);

    return this.userRepository.findOneBy({ id });
  }

  public async delete(id: number): Promise<boolean> {
    const { affected } = await this.userRepository.delete({ id });

    return !!affected;
  }
}
