import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UserToken } from './entities/user-token.entity';
import { User } from '../user/entities/user.entity';
import { UserTokenTypeEnum } from '../user-token-type/dto/user-token-type.enum';
import { UserTokenTypeService } from '../user-token-type/user-token-type.service';
import { Token } from '../auth/types/token.type';

@Injectable()
export class UserTokenService {
  constructor(
    private readonly userTokenTypeService: UserTokenTypeService,
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
  ) {}

  public async findByToken(token: string): Promise<UserToken> {
    return this.userTokenRepository.findOneBy({ token });
  }

  public async clearUserTokens(userId: number): Promise<boolean> {
    const { affected } = await this.userTokenRepository.delete({
      user: {
        id: userId,
      },
    });

    return !!affected;
  }

  public async create(
    createUserTokenDto: CreateUserTokenDto,
  ): Promise<UserToken> {
    const userToken = this.userTokenRepository.create(createUserTokenDto);
    userToken.token = crypto.randomBytes(32).toString('hex');

    return this.userTokenRepository.save(userToken);
  }

  public async createEmailToken(user: User): Promise<Token> {
    const [tokenType] = await this.userTokenTypeService.findAll(
      UserTokenTypeEnum.EMAIL_CONFIRMATION,
    );

    const { token } = await this.create({
      user,
      tokenType,
      expiresAt: this.getNextMonth(),
    });

    return token;
  }

  private getTomorrow(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    return date;
  }

  private getNextMonth(): Date {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);

    return date;
  }
}
