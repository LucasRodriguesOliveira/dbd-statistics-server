import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from '../../config/typeOrm/typeOrm-module.config';
import { PerkType } from '../perk-type/perk-type.entity';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmModuleConfig([PerkType]))],
})
export class TypeOrmPostgreSQLModule {}
