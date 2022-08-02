import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UserToken } from './entities/user-token.entity';
import { UserTokenType } from '../user-token-type/entities/user-token-type.entity';
import { User } from '../user/user.entity';

@Injectable()
export class UserTokenService {
  constructor(
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
    @InjectRepository(UserTokenType)
    private readonly userTokenTypeRepository: Repository<UserTokenType>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findByToken(token: string): Promise<UserToken> {
    return this.userTokenRepository.findOneBy({ token });
  }

  public async create(
    createUserTokenDto: CreateUserTokenDto,
  ): Promise<UserToken> {
    const userToken = this.userTokenRepository.create();
    userToken.token = crypto.randomBytes(32).toString('hex');
    userToken.tokenType = this.userTokenTypeRepository.create({
      id: createUserTokenDto.tokenTypeId,
    });
    userToken.user = this.userRepository.create({
      id: createUserTokenDto.userId,
    });
    userToken.expiresAt = this.getTomorrow();

    return this.userTokenRepository.save(userToken);
  }

  private getTomorrow(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    return date;
  }
}
