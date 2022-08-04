import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserTypeEnum } from '../user-type/enum/user-type.enum';
import { UserTypeService } from '../user-type/user-type.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserTokenService } from '../user-token/user-token.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userTypeService: UserTypeService,
    private readonly userTokenService: UserTokenService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(name?: string): Promise<User[]> {
    const where = {
      name: ILike(`${name || ''}%`),
    };

    return this.userRepository.findBy(where);
  }

  public async findById(id: number): Promise<User> {
    return this.userRepository.findOne({
      relations: {
        type: true,
      },
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const [userType] = await this.userTypeService.findAll(
      UserTypeEnum.STANDARD,
    );
    const password = await this.hashPassword(createUserDto.password);
    return this.userRepository.save({
      ...createUserDto,
      password,
      type: userType,
    });
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, {
      ...updateUserDto,
      isActive: updateUserDto.status,
    });

    return this.userRepository.findOneBy({ id });
  }

  public async delete(id: number): Promise<boolean> {
    await this.userTokenService.clearUserTokens(id);

    const { affected } = await this.userRepository.delete({ id });

    return !!affected;
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async checkPassword(password: string, user: User): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  private async changeStatus(id: number, status: boolean): Promise<User> {
    return this.update(id, { status });
  }

  public async activateUser(id: number): Promise<User> {
    return this.changeStatus(id, true);
  }

  public async deactivateUser(id: number): Promise<User> {
    return this.changeStatus(id, false);
  }
}
