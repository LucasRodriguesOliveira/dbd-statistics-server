import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from '../../config/typeOrm/typeOrm-module.config';
import { PerkType } from '../perk-type/enitites/perk-type.entity';
import { UserTokenType } from '../user-token-type/entities/user-token-type.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmModuleConfig([PerkType, UserTokenType])),
  ],
})
export class TypeOrmPostgreSQLModule {}
