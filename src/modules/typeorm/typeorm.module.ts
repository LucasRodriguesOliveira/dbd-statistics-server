import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from '../../config/typeOrm/typeOrm-module.config';
import { PerkType } from '../perk-type/enitites/perk-type.entity';
import { UserTokenType } from '../user-token-type/entities/user-token-type.entity';
import { UserToken } from '../user-token/entities/user-token.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(
      typeOrmModuleConfig([PerkType, UserTokenType, UserToken, User]),
    ),
  ],
})
export class TypeOrmPostgreSQLModule {}
